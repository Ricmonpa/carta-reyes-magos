#!/bin/bash

echo "🔨 Building DV360 package..."

cd "$(dirname "$0")"

# Crear placeholder si no existe
if [ ! -f "images/placeholder.png" ]; then
    echo "Creating placeholder image..."
    # Crear un placeholder simple (1x1 pixel transparente)
    echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" | base64 -d > images/placeholder.png 2>/dev/null || touch images/placeholder.png
fi

# Crear ZIP
echo "📦 Creating ZIP file..."
zip -r sanborns-reyes-magos-300x600.zip \
    index.html \
    styles.css \
    main.js \
    voice.js \
    products-data.js \
    manifest.json \
    images/ \
    -x "*.DS_Store" "*.git*" "build.sh"

# Verificar tamaño
SIZE=$(stat -f%z sanborns-reyes-magos-300x600.zip 2>/dev/null || stat -c%s sanborns-reyes-magos-300x600.zip 2>/dev/null)
SIZE_KB=$((SIZE / 1024))

echo ""
echo "✅ Build complete!"
echo "📊 ZIP size: ${SIZE_KB}KB (${SIZE} bytes)"

if [ $SIZE -gt 204800 ]; then
    echo "⚠️  WARNING: ZIP exceeds 200KB limit!"
    echo "   Consider optimizing images or minifying code further"
else
    echo "✅ ZIP size OK (< 200KB)"
fi

echo ""
echo "📁 Files included:"
unzip -l sanborns-reyes-magos-300x600.zip | tail -n +4 | head -n -2

echo ""
echo "🎉 Ready for DV360 upload!"

