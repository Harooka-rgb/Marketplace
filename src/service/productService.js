import { supabase } from '../supabase/index'

export const getProducts = async (category_id) => {
    // 1. Начинаем запрос
    let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false }); // Новые товары в начале

    // 2. Фильтруем, если ID передан
    if (category_id) {
        query = query.eq('category_id', category_id);
    }

    // 3. Выполняем запрос с обработкой ошибок
    const { data: products, error } = await query;
    
    if (error) {
        console.error('Ошибка Supabase:', error.message);
        return []; // Возвращаем пустой массив вместо undefined
    }

    console.log('ProductService: загруженные товары:', products);
    console.log('Количество товаров:', products?.length);
    return products;
}