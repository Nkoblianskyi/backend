
export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    width: string;
    height: string;
    depth: string;
    colors: string[];
    category?: string;
    rating?: number;
    reviewCount?: number;
    mainImage?: string;
    specialOffer?: boolean;
    popular?: boolean;
    relatedProductIds?: number[];
    relatedProducts?: number[];
}

export class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    width?: string;
    height?: string;
    depth?: string;
    colors?: string[];
    category?: string;
    rating?: number;
    reviewCount?: number;
    mainImage?: string;
    specialOffer?: boolean;
    popular?: boolean;
    relatedProductIds?: number[];
    relatedProducts?: number[];
}
