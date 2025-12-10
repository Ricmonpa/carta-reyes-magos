// Script para extraer links de categorías de Sanborns
// Ejecutar en la consola de Chrome en sanborns.com.mx

console.log('🔍 Extrayendo links de categorías de Sanborns...\n');

const categories = {};

// Extraer todos los links del menú de categorías
const menuLinks = document.querySelectorAll('a[href*="/cat/"]');

menuLinks.forEach(link => {
    const href = link.href;
    const text = link.textContent.trim();
    
    if (text && href.includes('/cat/')) {
        categories[text] = href;
    }
});

// Mostrar resultado
console.log('📦 Categorías encontradas:');
console.log(JSON.stringify(categories, null, 2));

// Copiar al clipboard
const output = JSON.stringify(categories, null, 2);
navigator.clipboard.writeText(output);
console.log('\n✅ Links copiados al clipboard!');
console.log('📋 Pega el resultado en un mensaje');

