// Generador de estructura JSON para productos
// Facilita agregar productos manualmente o desde datos externos

function generateProductStructure() {
    // Estructura base para un producto
    const productTemplate = {
        id: "CATEGORIA_PROD_001", // Formato: CATEGORIA_PROD_NUM
        nombre: "Nombre del producto",
        marca: "Marca",
        categoria: "Categoría (celular, tablet, etc.)",
        precio: 0,
        descuento: 0, // Porcentaje (0-100)
        precio_final: 0, // Se calcula automáticamente
        imagen: "images/placeholder.svg", // URL de imagen
        descripcion: "Descripción breve",
        disponible_pickup: true,
        tiendas_cercanas: ["Consultar disponibilidad"],
        stock: "Disponible",
        tags: ["tag1", "tag2"], // Keywords para búsqueda
        url_compra: "https://www.sanborns.com.mx/cat/categoria?id=X#modalPostalCode"
    };
    
    // Mapeo de categorías con sus URLs
    const categoryStructure = {
        "celular": {
            url: "https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode",
            keywords: ["celular", "telefono", "iphone", "samsung", "motorola", "smartphone"],
            exampleProducts: [
                { nombre: "iPhone 15 Pro", marca: "Apple", precio: 25000 },
                { nombre: "Samsung Galaxy S24", marca: "Samsung", precio: 20000 },
                { nombre: "Motorola Edge 40", marca: "Motorola", precio: 8000 }
            ]
        },
        "tablet": {
            url: "https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode",
            keywords: ["tablet", "ipad", "galaxy tab", "fire"],
            exampleProducts: [
                { nombre: "iPad Air", marca: "Apple", precio: 12000 },
                { nombre: "Samsung Galaxy Tab S9", marca: "Samsung", precio: 15000 }
            ]
        },
        "audifonos": {
            url: "https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode",
            keywords: ["audifonos", "airpods", "beats", "headphones"],
            exampleProducts: [
                { nombre: "AirPods Pro", marca: "Apple", precio: 5000 },
                { nombre: "Beats Studio Buds", marca: "Beats", precio: 3000 }
            ]
        },
        "consola": {
            url: "https://www.sanborns.com.mx/cat/videojuegos?id=12#modalPostalCode",
            keywords: ["playstation", "xbox", "nintendo", "switch", "ps5"],
            exampleProducts: [
                { nombre: "PlayStation 5", marca: "Sony", precio: 12000 },
                { nombre: "Xbox Series X", marca: "Microsoft", precio: 11000 },
                { nombre: "Nintendo Switch", marca: "Nintendo", precio: 8000 }
            ]
        },
        "juguetes": {
            url: "https://www.sanborns.com.mx/cat/juguetes-y-dulces?id=8#modalPostalCode",
            keywords: ["lego", "hot wheels", "barbie", "mario", "juguete"],
            exampleProducts: [
                { nombre: "LEGO Star Wars", marca: "LEGO", precio: 3000 },
                { nombre: "Hot Wheels Track", marca: "Hot Wheels", precio: 1500 }
            ]
        },
        "perfumes": {
            url: "https://www.sanborns.com.mx/cat/perfumes%20y%20maquillaje?id=13#modalPostalCode",
            keywords: ["perfume", "fragancia", "carolina herrera", "dior", "versace"],
            exampleProducts: [
                { nombre: "Carolina Herrera Good Girl", marca: "Carolina Herrera", precio: 3500 },
                { nombre: "Dior Sauvage", marca: "Dior", precio: 4000 }
            ]
        },
        "hogar": {
            url: "https://www.sanborns.com.mx/cat/hogar-y-oficina?id=1#modalPostalCode",
            keywords: ["cafetera", "licuadora", "freidora", "electrodomestico"],
            exampleProducts: [
                { nombre: "Cafetera Nespresso", marca: "Nespresso", precio: 5000 },
                { nombre: "Licuadora Oster", marca: "Oster", precio: 2000 }
            ]
        },
        "vinos": {
            url: "https://www.sanborns.com.mx/cat/regalos/vinos%20y%20licores/vinos?id=160201#modalPostalCode",
            keywords: ["vino", "vinos", "licor", "champagne"],
            exampleProducts: []
        }
    };
    
    return {
        template: productTemplate,
        categories: categoryStructure,
        instructions: `
INSTRUCCIONES PARA ENRIQUECER LA BASE DE DATOS:

1. Para cada categoría, agrega productos reales de Sanborns
2. Usa el template como base
3. Asegúrate de incluir:
   - ID único (CATEGORIA_PROD_XXX)
   - Nombre completo del producto
   - Marca
   - Precio real de Sanborns
   - Tags relevantes para búsqueda
   - URL de la categoría correspondiente

4. Puedes obtener productos de:
   - Páginas de categorías de Sanborns
   - Búsquedas en sanborns.com.mx
   - Catálogos oficiales

5. Para agregar una nueva categoría:
   - Agrega entrada en categoryStructure
   - Agrega keywords en gemini-api.js
   - Agrega URL en main.js categoryUrls
        `
    };
}

// Función para generar JSON desde datos externos
function generateProductsFromData(categoryName, productsData) {
    const categoryMap = generateProductStructure().categories[categoryName];
    if (!categoryMap) {
        console.error(`Categoría ${categoryName} no encontrada`);
        return [];
    }
    
    return productsData.map((data, index) => {
        const id = `${categoryName.toUpperCase()}_PROD_${String(index + 1).padStart(3, '0')}`;
        const precio_final = data.descuento 
            ? Math.round(data.precio * (1 - data.descuento / 100))
            : data.precio;
        
        return {
            id,
            nombre: data.nombre,
            marca: data.marca || '',
            categoria: categoryName,
            precio: data.precio,
            descuento: data.descuento || 0,
            precio_final,
            imagen: data.imagen || 'images/placeholder.svg',
            descripcion: data.descripcion || '',
            disponible_pickup: true,
            tiendas_cercanas: ['Consultar disponibilidad'],
            stock: 'Disponible',
            tags: data.tags || categoryMap.keywords.slice(0, 3),
            url_compra: categoryMap.url
        };
    });
}

// Exportar
window.generateProductStructure = generateProductStructure;
window.generateProductsFromData = generateProductsFromData;

console.log('✅ Generador de estructura cargado!');
console.log('📋 Usa: generateProductStructure() para ver template');
console.log('📋 Usa: generateProductsFromData("celular", [...]) para generar productos');

