import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supabase } from '../../../supabase';
import styles from './AdminDashboard.module.css';
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, 
  FiLogOut, FiPackage, FiSave, FiAlertCircle,
  FiUpload, FiImage
} from 'react-icons/fi';

const ADMIN_EMAIL = 'grenitt99@gmail.com';

const initialProductState = {
  product_name: '',
  brand: '',
  price: '',
  old_price: '',
  description: '',
  stock: '',
  category_id: '',
  image: '',
  images: [],
  rating: '',
  reviews_count: '',
  cpu: '',
  gpu: '',
  display: '',
  battery: '',
  ram: '',
  storage: '',
  os: '',
  weight: '',
  in_stock: true,
  specifications: {}
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialProductState);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || user?.email !== ADMIN_EMAIL) {
      navigate('/admin/login');
      return;
    }
    checkAdminAndLoad();
  }, [isAuthenticated, user, navigate]);

  const checkAdminAndLoad = async () => {
    const { data: adminData } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!adminData) {
      await supabase.from('admins').insert({
        user_id: user.id,
        email: ADMIN_EMAIL
      });
    }
    loadProducts();
  };

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData(initialProductState);
    setImageFile(null);
    setImagePreview(null);
    setMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      ...initialProductState,
      ...product,
      price: product.price || '',
      old_price: product.old_price || '',
      stock: product.stock || '',
      category_id: product.category_id || '',
      rating: product.rating || '',
      reviews_count: product.reviews_count || '',
      ram: product.ram || '',
      weight: product.weight || ''
    });
    // Устанавливаем текущее изображение для предпросмотра
    if (product.image) {
      setImagePreview(product.image);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
    setMessage('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData(initialProductState);
    setImageFile(null);
    setImagePreview(null);
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Ошибка: Размер файла не должен превышать 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setMessage('Ошибка: Можно загружать только изображения');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage('');
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setMessage('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Ошибка: Размер файла не должен превышать 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setMessage('Ошибка: Можно загружать только изображения');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage('');
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Ошибка загрузки изображения: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    // Загрузка изображения
    let imageUrl = formData.image;
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        setSaving(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    const { id, created_at, ...rest } = formData;
    const productData = {
      ...rest,
      image: imageUrl,
      price: parseFloat(formData.price) || 0,
      old_price: parseFloat(formData.old_price) || null,
      stock: parseInt(formData.stock) || 0,
      category_id: parseInt(formData.category_id) || null,
      rating: parseFloat(formData.rating) || 0,
      reviews_count: parseInt(formData.reviews_count) || 0,
      ram: parseInt(formData.ram) || null,
      weight: parseFloat(formData.weight) || null,
      images: Array.isArray(formData.images) ? formData.images : [],
      specifications: formData.specifications || {}
    };

    let result;
    if (editingProduct) {
      result = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id)
        .select();
      
      if (!result.error) {
        setMessage('Товар успешно обновлен!');
      }
    } else {
      result = await supabase
        .from('products')
        .insert(productData)
        .select();
      
      if (!result.error) {
        setMessage('Товар успешно создан!');
      }
    }

    if (result.error) {
      setMessage('Ошибка: ' + result.error.message);
    } else {
      setMessage(editingProduct ? 'Товар успешно обновлен!' : 'Товар успешно создан!');
      setTimeout(() => {
        closeModal();
        loadProducts();
      }, 1500);
    }
    setSaving(false);
  };

  const handleDelete = async (productId) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (!error) {
      setDeleteConfirm(null);
      loadProducts();
    }
  };

  const filteredProducts = products.filter(p =>
    p.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => 
    price ? `${Number(price).toLocaleString('ru-RU')} С` : '0 С';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <FiPackage size={28} className={styles.headerIcon} />
          <div>
            <h1>Admin Dashboard</h1>
            <span>Управление товарами</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.adminBadge}>{ADMIN_EMAIL}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <FiLogOut size={18} /> Выйти
          </button>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button onClick={openCreateModal} className={styles.addBtn}>
          <FiPlus size={18} /> Добавить товар
        </button>
      </div>

      {loading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Изображение</th>
                <th>Название</th>
                <th>Бренд</th>
                <th>Цена</th>
                <th>Скидка</th>
                <th>Наличие</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>
                    <img 
                      src={product.image || '/placeholder.png'} 
                      alt={product.product_name}
                      className={styles.productImg}
                    />
                  </td>
                  <td className={styles.nameCell}>{product.product_name}</td>
                  <td>{product.brand}</td>
                  <td className={styles.priceCell}>{formatPrice(product.price)}</td>
                  <td>{product.old_price ? formatPrice(product.old_price) : '-'}</td>
                  <td>
                    <span className={product.in_stock ? styles.inStock : styles.outStock}>
                      {product.in_stock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button 
                      onClick={() => openEditModal(product)}
                      className={styles.editBtn}
                      title="Редактировать"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      onClick={() => setDeleteConfirm(product)}
                      className={styles.deleteBtn}
                      title="Удалить"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className={styles.empty}>Товары не найдены</div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingProduct ? 'Редактировать товар' : 'Создать товар'}</h2>
              <button onClick={closeModal} className={styles.closeBtn}>
                <FiX size={20} />
              </button>
            </div>

            {message && (
              <div className={message.includes('Ошибка') ? styles.errorMessage : styles.successMessage}>
                <FiAlertCircle size={16} />
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Название товара *</label>
                  <input
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Например: Acer Nitro 5"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Бренд *</label>
                  <input
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    placeholder="Например: Acer"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Цена (в сомах) *</label>
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="78000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Старая цена (для скидки)</label>
                  <input
                    name="old_price"
                    type="number"
                    value={formData.old_price}
                    onChange={handleInputChange}
                    placeholder="85000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Изображение товара</label>
                  <div className={styles.imageUpload}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    
                    {imagePreview ? (
                      <div className={styles.imagePreview}>
                        <img src={imagePreview} alt="Preview" />
                        <button
                          type="button"
                          onClick={handleImageRemove}
                          className={styles.removeImageBtn}
                          title="Удалить изображение"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className={styles.uploadArea}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        {uploading ? (
                          <div className={styles.uploadingState}>
                            <div className={styles.spinner} />
                            <p>Загрузка...</p>
                          </div>
                        ) : (
                          <>
                            <FiUpload size={24} className={styles.uploadIcon} />
                            <p>Нажмите для загрузки изображения</p>
                            <span>или перетащите файл сюда</span>
                            <small>JPG, PNG, WEBP до 5MB</small>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Категория ID</label>
                  <input
                    name="category_id"
                    type="number"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Количество на складе</label>
                  <input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="10"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Рейтинг</label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    max="5"
                    min="0"
                    value={formData.rating}
                    onChange={handleInputChange}
                    placeholder="4.5"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Количество отзывов</label>
                  <input
                    name="reviews_count"
                    type="number"
                    value={formData.reviews_count}
                    onChange={handleInputChange}
                    placeholder="42"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>В наличии</label>
                  <label className={styles.checkbox}>
                    <input
                      name="in_stock"
                      type="checkbox"
                      checked={formData.in_stock}
                      onChange={handleInputChange}
                    />
                    <span>Да</span>
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Описание</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Описание товара..."
                />
              </div>

              <h3 className={styles.sectionTitle}>Характеристики</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>CPU</label>
                  <input
                    name="cpu"
                    value={formData.cpu}
                    onChange={handleInputChange}
                    placeholder="Intel Core i7-12700H"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>GPU</label>
                  <input
                    name="gpu"
                    value={formData.gpu}
                    onChange={handleInputChange}
                    placeholder="RTX 3060"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Экран</label>
                  <input
                    name="display"
                    value={formData.display}
                    onChange={handleInputChange}
                    placeholder='15.6" FHD 144Hz'
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Батарея</label>
                  <input
                    name="battery"
                    value={formData.battery}
                    onChange={handleInputChange}
                    placeholder="4-cell 57Wh"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>RAM (GB)</label>
                  <input
                    name="ram"
                    type="number"
                    value={formData.ram}
                    onChange={handleInputChange}
                    placeholder="16"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Накопитель</label>
                  <input
                    name="storage"
                    value={formData.storage}
                    onChange={handleInputChange}
                    placeholder="512GB SSD"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>ОС</label>
                  <input
                    name="os"
                    value={formData.os}
                    onChange={handleInputChange}
                    placeholder="Windows 11"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Вес (кг)</label>
                  <input
                    name="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="2.3"
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>
                  Отмена
                </button>
                <button 
                  type="submit" 
                  disabled={saving || uploading}
                  className={styles.saveBtn}
                >
                  <FiSave size={18} />
                  {saving ? 'Сохранение...' : uploading ? 'Загрузка...' : (editingProduct ? 'Сохранить' : 'Создать')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.deleteModal}>
            <FiAlertCircle size={48} className={styles.deleteIcon} />
            <h3>Удалить товар?</h3>
            <p>Вы уверены, что хотите удалить "{deleteConfirm.product_name}"?</p>
            <p>Это действие нельзя отменить.</p>
            <div className={styles.deleteActions}>
              <button onClick={() => setDeleteConfirm(null)} className={styles.cancelBtn}>
                Отмена
              </button>
              <button 
                onClick={() => handleDelete(deleteConfirm.id)} 
                className={styles.confirmDeleteBtn}
              >
                <FiTrash2 size={16} /> Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
