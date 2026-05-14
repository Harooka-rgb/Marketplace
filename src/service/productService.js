import { supabase } from '../supabase/index'

export const getProducts = async (category_id) => {
    try {
        let query = supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false }); // Новые товары в начале

        // Фильтруем по категории, если ID передан
        if (category_id) {
            query = query.eq('category_id', category_id);
        }

        const { data: products, error } = await query;
        
        if (error) {
            console.error('Ошибка Supabase:', error.message);
            throw new Error(error.message);
        }

        console.log('ProductService: загруженные товары:', products);
        console.log('Фильтр по категории:', category_id);
        console.log('Количество товаров:', products?.length);
        
        return products || [];
    } catch (error) {
        console.error('Ошибка в getProducts:', error);
        throw error;
    }
}