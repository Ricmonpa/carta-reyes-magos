// Sistema de productos dinámico - NO requiere DB completa
// Usa búsquedas inteligentes en lugar de productos hardcodeados

class DynamicProductMatcher {
    constructor() {
        // Mapeo de categorías a URLs y términos de búsqueda
        this.categoryMap = {
            'celular': {
                url: 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
                searchTerms: ['iphone', 'samsung galaxy', 'motorola', 'celular', 'smartphone'],
                keywords: ['celular', 'telefono', 'iphone', 'samsung', 'motorola', 'smartphone']
            },
            'tablet': {
                url: 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
                searchTerms: ['ipad', 'tablet samsung', 'tablet amazon', 'tablet'],
                keywords: ['tablet', 'ipad', 'galaxy tab', 'fire']
            },
            'audifonos': {
                url: 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
                searchTerms: ['audifonos', 'airpods', 'beats', 'sony headphones'],
                keywords: ['audifonos', 'airpods', 'beats', 'headphones', 'auriculares']
            },
            'pantallas': {
                url: 'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10#modalPostalCode',
                searchTerms: ['smart tv', 'television', 'pantalla', 'roku'],
                keywords: ['tv', 'television', 'pantalla', 'smart tv', 'roku']
            },
            'consola': {
                url: 'https://www.sanborns.com.mx/cat/videojuegos?id=12#modalPostalCode',
                searchTerms: ['playstation', 'xbox', 'nintendo switch'],
                keywords: ['playstation', 'ps5', 'xbox', 'nintendo', 'switch', 'consola']
            },
            'videojuegos': {
                url: 'https://www.sanborns.com.mx/cat/videojuegos?id=12#modalPostalCode',
                searchTerms: ['videojuegos', 'juegos', 'games'],
                keywords: ['videojuego', 'juego', 'game', 'mario', 'fifa']
            },
            'juguetes': {
                url: 'https://www.sanborns.com.mx/cat/juguetes-y-dulces?id=8#modalPostalCode',
                searchTerms: ['lego', 'hot wheels', 'barbie', 'mario'],
                keywords: ['lego', 'hot wheels', 'barbie', 'juguete', 'mario']
            },
            'perfumes': {
                url: 'https://www.sanborns.com.mx/cat/perfumes%20y%20maquillaje?id=13#modalPostalCode',
                searchTerms: ['perfume', 'carolina herrera', 'dior', 'versace'],
                keywords: ['perfume', 'fragancia', 'colonia', 'carolina herrera', 'dior']
            },
            'hogar': {
                url: 'https://www.sanborns.com.mx/cat/hogar%20y%20oficina/electrodom%C3%A9sticos/preparaci%C3%B3n%20de%20alimentos?id=10801#modalPostalCode',
                searchTerms: ['cafetera', 'licuadora', 'freidora', 'electrodomestico'],
                keywords: ['cafetera', 'licuadora', 'freidora', 'hogar', 'cocina']
            },
            'libros': {
                url: 'https://www.sanborns.com.mx/cat/libros-digitales?id=10#modalPostalCode',
                searchTerms: ['libro', 'novela', 'lectura'],
                keywords: ['libro', 'novela', 'lectura', 'harry potter']
            },
            'relojes': {
                // Usamos búsqueda directa de smartwatch para evitar categoría vacía
                url: 'https://www.sanborns.com.mx/resultados?query=smartwatch#modalPostalCode',
                searchTerms: ['smartwatch', 'apple watch', 'reloj inteligente'],
                keywords: ['smartwatch', 'reloj inteligente', 'apple watch', 'watch', 'reloj']
            },
            'bolsas': {
                url: 'https://www.sanborns.com.mx/cat/moda-y-belleza?id=6#modalPostalCode',
                searchTerms: ['bolsa', 'bolso', 'mochila'],
                keywords: ['bolsa', 'bolso', 'mochila', 'cartera']
            },
            'vinos': {
                url: 'https://www.sanborns.com.mx/cat/regalos/vinos%20y%20licores/vinos?id=160201#modalPostalCode',
                searchTerms: ['vino tinto', 'vino blanco', 'vino rosado', 'champagne', 'espumoso', 'licores'],
                keywords: ['vino', 'vinos', 'licor', 'champagne', 'espumoso', 'tinto', 'blanco', 'rosado']
            },
            'cremas': {
                url: 'https://www.sanborns.com.mx/cat/farmacia/higiene%20y%20salud/cremas?id=140202#modalPostalCode',
                searchTerms: ['crema facial', 'crema para cara', 'crema hidratante', 'skincare'],
                keywords: ['crema', 'cremas', 'cara', 'facial', 'hidratante', 'skincare', 'piel', 'rostro']
            }
        };
    }
    
    // Encontrar categoría basada en mensaje
    findCategory(userMessage) {
        const message = userMessage.toLowerCase();
        
        for (const [category, data] of Object.entries(this.categoryMap)) {
            if (data.keywords.some(keyword => message.includes(keyword))) {
                return { category, ...data };
            }
        }
        
        return null;
    }
    
    // Generar productos "virtuales" basados en categoría
    generateVirtualProducts(categoryData, userMessage) {
        // En lugar de productos reales, generamos tarjetas que redirigen a la categoría
        const searchTerms = categoryData.searchTerms.slice(0, 3);
        
        return searchTerms.map((term, index) => ({
            id: `VIRTUAL_${categoryData.category}_${index}`,
            nombre: term.charAt(0).toUpperCase() + term.slice(1),
            marca: '',
            categoria: categoryData.category,
            precio: 0,
            descuento: 0,
            precio_final: 0,
            imagen: 'images/placeholder.svg',
            descripcion: `Ver ${term} en Sanborns`,
            disponible_pickup: true,
            tiendas_cercanas: ['Consultar disponibilidad'],
            stock: 'Disponible',
            tags: [term],
            // Usar URL de categoría directamente en lugar de búsqueda
            url_compra: categoryData.url,
            isVirtual: true // Flag para indicar que es producto virtual
        }));
    }
}

// Exportar
window.DynamicProductMatcher = DynamicProductMatcher;

