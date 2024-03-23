export interface loginValues {
    username: string
    password: string
}

export interface signUpValues extends loginValues {
    confirm_password: string
}


export interface Product {
    id: number;
    shop: number;
    category: string[]; // Массив строк, предположим, что категории являются строками
    title: string;
    description: string;
    image: string;
    product_images: {
        id
        :
        number
        image
        :
        string
        product
        :
        number
    }[]; // Массив строк с URL-адресами изображений
    price: number;
    currency: string;
    product_configurator: {
        id: number,
        configurator_key: string,
        key: string,
        values: {
            price: number,
            title: string
        }[]
    }[],
    created: string; // Дата в формате строки
    product_attributes: { key: string, value: string }[]
    shop_name: string
    shop_logo: string
    old_price: number
    average_rating: number | null
    quantity: number
}
export interface ProductData {
    count: number,
    next: string,
    previous: null | string,
    results: Product[]
}