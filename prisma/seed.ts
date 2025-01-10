import { PrismaClient, Product  } from '@prisma/client';

const prisma = new PrismaClient();

const bucketName = "furniture";
const baseUrl = `https://${bucketName}.s3.eu-north-1.amazonaws.com`;
const baseDirectory = "Images";

function getS3ImageUrl(imagePath: string) {
  return `${baseUrl}/${baseDirectory}/${imagePath}`;
}

const products = [
  {
    id: 1,
    name: "Commode Classic",
    price: 278,
    description: "Living room furniture",
    rating: 4.8,
    reviewCount: 528,
    category: "Bedroom",
    mainImage: "product3.jpg",
    images: ["product3.jpg", "1-1.jpg", "D-min.jpg"],
    dimensions: [
      { width: 60, height: 72, depth: 60 },
      { width: 90, height: 82, depth: 90 },
      { width: 120, height: 92, depth: 120 },
    ],
    colors: ["white", "black", "blue"],
    specialOffer: true,
    popular: true,
  },
  {
    id: 2,
    name: "Modern Sofa",
    price: 550,
    description: "Stylish and comfortable sofa",
    rating: 4.6,
    reviewCount: 432,
    category: "Office",
    mainImage: "product1.jpg",
    images: ["product1.jpg", "product3.jpg", "product2.jpg"],
    dimensions: [
      { width: 60, height: 70, depth: 55 },
      { width: 80, height: 90, depth: 70 },
    ],
    colors: ["grey", "navy", "beige"],
    specialOffer: false,
    popular: true,
  },
  {
    id: 3,
    name: "Dining Table Set",
    price: 450,
    description: "Elegant dining table with 4 chairs",
    rating: 4.7,
    reviewCount: 678,
    category: "Hallways",
    mainImage: "product2.jpg",
    images: ["product1.jpg", "product2.jpg"],
    dimensions: [
      { width: 120, height: 75, depth: 80 },
    ],
    colors: ["oak", "white", "cherry"],
    specialOffer: false,
    popular: false,
  },
  {
    id: 4,
    name: "Dining Table Set",
    price: 450,
    description: "Elegant dining table with 4 chairs",
    rating: 4.7,
    reviewCount: 678,
    category: "Hallways",
    mainImage: "product2.jpg",
    images: ["product1.jpg", "product2.jpg"],
    dimensions: [
      { width: 120, height: 75, depth: 80 },
    ],
    colors: ["oak", "white", "cherry"],
    specialOffer: false,
    popular: false,
  },
  {
    id: 5,
    name: "Dining Table Set",
    price: 450,
    description: "Elegant dining table with 4 chairs",
    rating: 4.7,
    reviewCount: 678,
    category: "Hallways",
    mainImage: "product2.jpg",
    images: ["product1.jpg", "product2.jpg"],
    dimensions: [
      { width: 120, height: 75, depth: 80 },
    ],
    colors: ["oak", "white", "cherry"],
    specialOffer: false,
    popular: false,
  },
  {
    id: 6,
    name: "Dining Table Set",
    price: 450,
    description: "Elegant dining table with 4 chairs",
    rating: 4.7,
    reviewCount: 678,
    category: "Hallways",
    mainImage: "product2.jpg",
    images: ["product1.jpg", "product2.jpg"],
    dimensions: [
      { width: 120, height: 75, depth: 80 },
    ],
    colors: ["oak", "white", "cherry"],
    specialOffer: false,
    popular: false,
  },
  {
    id: 7,
    name: "Dining Table Set",
    price: 450,
    description: "Elegant dining table with 4 chairs",
    rating: 4.7,
    reviewCount: 678,
    category: "Hallways",
    mainImage: "product2.jpg",
    images: ["product1.jpg", "product2.jpg"],
    dimensions: [
      { width: 120, height: 75, depth: 80 },
    ],
    colors: ["oak", "white", "cherry"],
    specialOffer: false,
    popular: false,
  },
];

async function main() {
  await prisma.color.deleteMany();
  await prisma.dimension.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();

  const createdProducts: Product[] = [];

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        rating: product.rating,
        reviewCount: product.reviewCount,
        category: product.category,
        mainImage: getS3ImageUrl(product.mainImage),
        specialOffer: product.specialOffer,
        popular: product.popular,
        Image: {
          create: product.images.map((image) => ({
            url: getS3ImageUrl(image),
          })),
        },
        Dimension: {
          create: product.dimensions.map((dimension) => ({
            type: "custom",
            value: `${dimension.width}x${dimension.height}x${dimension.depth}`,
            width: dimension.width,
            height: dimension.height,
            depth: dimension.depth,
          })),
        },
        Color: {
          create: product.colors.map((color) => ({
            name: color,
          })),
        },
      },
      include: {
        Image: true,
        Dimension: true,
        Color: true,
      },
    });

    createdProducts.push(createdProduct);
  }
  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
