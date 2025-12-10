// Scraper para extraer productos de Sanborns
// NOTA: Ejecutar en navegador (consola) en sanborns.com.mx

async function scrapeSanbornsCategory(categoryUrl) {
    console.log(`🔍 Extrayendo productos de: ${categoryUrl}`);
    
    // Abrir la categoría
    const response = await fetch(categoryUrl);
    const html = await response.text();
    
    // Parsear HTML (requiere DOMParser en navegador)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const products = [];
    
    // Buscar tarjetas de productos (ajustar selectores según estructura de Sanborns)
    const productCards = doc.querySelectorAll('[data-product], .product-card, .item-product');
    
    productCards.forEach((card, index) => {
        try {
            const product = {
                id: `SANB_${Date.now()}_${index}`,
                nombre: card.querySelector('.product-name, h3, [data-name]')?.textContent?.trim() || '',
                marca: card.querySelector('.brand, .marca')?.textContent?.trim() || '',
                categoria: extractCategoryFromUrl(categoryUrl),
                precio: extractPrice(card),
                descuento: extractDiscount(card),
                precio_final: 0, // Se calcula después
                imagen: card.querySelector('img')?.src || '',
                descripcion: card.querySelector('.description')?.textContent?.trim() || '',
                disponible_pickup: true,
                tiendas_cercanas: ['Consultar disponibilidad'],
                stock: 'Disponible',
                tags: [],
                url_compra: categoryUrl
            };
            
            // Calcular precio final
            if (product.descuento > 0) {
                product.precio_final = Math.round(product.precio * (1 - product.descuento / 100));
            } else {
                product.precio_final = product.precio;
            }
            
            // Extraer tags del nombre
            product.tags = extractTags(product.nombre, product.marca);
            
            products.push(product);
        } catch (error) {
            console.warn(`⚠️ Error extrayendo producto ${index}:`, error);
        }
    });
    
    return products;
}

function extractPrice(card) {
    const priceText = card.querySelector('.price, .precio, [data-price]')?.textContent || '';
    const priceMatch = priceText.match(/[\d,]+/);
    if (priceMatch) {
        return parseInt(priceMatch[0].replace(/,/g, ''));
    }
    return 0;
}

function extractDiscount(card) {
    const discountText = card.querySelector('.discount, .descuento')?.textContent || '';
    const discountMatch = discountText.match(/(\d+)%/);
    return discountMatch ? parseInt(discountMatch[1]) : 0;
}

function extractCategoryFromUrl(url) {
    // Extraer categoría de la URL
    const match = url.match(/cat\/([^?]+)/);
    if (match) {
        return match[1].split('/').pop();
    }
    return 'general';
}

function extractTags(nombre, marca) {
    const text = `${nombre} ${marca}`.toLowerCase();
    const tags = [];
    
    // Tags comunes
    if (text.includes('iphone') || text.includes('apple')) tags.push('iphone', 'apple', 'celular');
    if (text.includes('samsung')) tags.push('samsung', 'android');
    if (text.includes('playstation') || text.includes('ps5')) tags.push('playstation', 'consola');
    if (text.includes('nintendo')) tags.push('nintendo', 'switch');
    if (text.includes('xbox')) tags.push('xbox', 'consola');
    if (text.includes('lego')) tags.push('lego', 'juguete');
    if (text.includes('perfume')) tags.push('perfume', 'fragancia');
    
    return tags;
}

// Función principal para ejecutar
async function scrapeAllCategories() {
    const categories = [
        'https://www.sanborns.com.mx/cat/tecnolog%C3%ADa%20y%20electr%C3%B3nica?id=10',
        'https://www.sanborns.com.mx/cat/videojuegos?id=12',
        'https://www.sanborns.com.mx/cat/perfumes%20y%20maquillaje?id=13',
        'https://www.sanborns.com.mx/cat/juguetes-y-dulces?id=8',
        'https://www.sanborns.com.mx/cat/hogar-y-oficina?id=1',
        'https://www.sanborns.com.mx/cat/libros-digitales?id=10',
        'https://www.sanborns.com.mx/cat/moda-y-belleza?id=6',
        'https://www.sanborns.com.mx/cat/regalos/vinos%20y%20licores/vinos?id=160201'
    ];
    
    const allProducts = {};
    
    for (const categoryUrl of categories) {
        try {
            const products = await scrapeSanbornsCategory(categoryUrl);
            const categoryName = extractCategoryFromUrl(categoryUrl);
            allProducts[categoryName] = products;
            console.log(`✅ ${categoryName}: ${products.length} productos`);
        } catch (error) {
            console.error(`❌ Error en ${categoryUrl}:`, error);
        }
    }
    
    // Copiar al clipboard
    const output = JSON.stringify(allProducts, null, 2);
    navigator.clipboard.writeText(output);
    console.log('\n✅ Productos copiados al clipboard!');
    console.log('📋 Pega el resultado en products-data.js');
    
    return allProducts;
}

// Exportar para uso
window.scrapeSanborns = scrapeAllCategories;

