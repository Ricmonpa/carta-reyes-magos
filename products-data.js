// Base de datos REAL de productos Sanborns
const productsDatabase = {
  "audifonos": [
    {
      id: "ELEC_ACC_010",
      nombre: "Audífonos Beats Studio Buds +",
      marca: "Beats",
      categoria: "Electrónicos",
      precio: 3299,
      descuento: 10,
      precio_final: 2969,
      imagen: "https://www.sanborns.com.mx/c/buen-fin/beats/",
      descripcion: "Audífonos inalámbricos con cancelación de ruido",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["audio", "inalambrico", "ejercicio", "premium", "beats", "cancelacion ruido"],
      url_compra: "https://www.sanborns.com.mx/search?q=beats+studio+buds"
    },
    {
      id: "ELEC_ACC_051",
      nombre: "Audífonos Beats Solo 4",
      marca: "Beats",
      categoria: "Electrónicos",
      precio: 4499,
      descuento: 11,
      precio_final: 3999,
      imagen: "https://www.sanborns.com.mx/c/buen-fin/beats/",
      descripcion: "Audífonos over-ear con sonido premium",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["audio", "premium", "inalambrico", "musica", "beats"],
      url_compra: "https://www.sanborns.com.mx/search?q=beats+solo+4"
    }
  ],
  
  "tablet": [
    {
      id: "ELEC_TAB_002",
      nombre: "Samsung Galaxy Tab S6 Lite + S Pen",
      marca: "Samsung",
      categoria: "Electrónicos",
      precio: 6999,
      descuento: 0,
      precio_final: 6999,
      imagen: "https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8806095088518.jpg",
      descripcion: "Tablet 4GB+128GB Verde con S Pen incluido",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["tablet", "samsung", "estudio", "dibujo", "trabajo"],
      url_compra: "https://www.sanborns.com.mx/search?q=samsung+galaxy+tab+s6+lite"
    },
    {
      id: "ELEC_TAB_003",
      nombre: "Tablet Fire Kids 7 Amazon",
      marca: "Amazon",
      categoria: "Electrónicos",
      precio: 4299,
      descuento: 53,
      precio_final: 1999,
      imagen: "https://resources.claroshop.com/imagenes-sanborns-ii/1200/6942103125393.jpg",
      descripcion: "Tablet infantil 16GB Azul con controles parentales",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["tablet", "niños", "infantil", "educativo", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=tablet+fire+kids+amazon"
    },
    {
      id: "ELEC_TAB_004",
      nombre: "Samsung Galaxy Tab S9 FE + Cover",
      marca: "Samsung",
      categoria: "Electrónicos",
      precio: 12999,
      descuento: 0,
      precio_final: 12999,
      imagen: "https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/8806095277783.jpg",
      descripcion: "Tablet premium 256GB Menta con Smart Book Cover",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["tablet", "premium", "samsung", "trabajo", "productividad"],
      url_compra: "https://www.sanborns.com.mx/search?q=samsung+galaxy+tab+s9+fe"
    },
    {
      id: "ELEC_TAB_043",
      nombre: "Lenovo Tab M10 5G",
      marca: "Lenovo",
      categoria: "Electrónicos",
      precio: 7999,
      descuento: 30,
      precio_final: 5599,
      imagen: "https://resources.claroshop.com/imagenes-sanborns-ii/1200/197532683587.jpg",
      descripcion: "Tablet 6GB RAM 128GB con conectividad 5G",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["tablet", "5g", "multimedia", "streaming"],
      url_compra: "https://www.sanborns.com.mx/search?q=lenovo+tab+m10+5g"
    }
  ],
  
  "celular": [
    {
      id: "ELEC_CEL_005",
      nombre: "iPhone 13 128GB Azul",
      marca: "Apple",
      categoria: "Electrónicos",
      precio: 15499,
      descuento: 25,
      precio_final: 11499,
      imagen: "https://www.sanborns.com.mx/c/apple/iphone/iphone-16-modelos.jpg",
      descripcion: "Reacondicionado Grado A, como nuevo",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["celular", "iphone", "apple", "smartphone", "premium"],
      url_compra: "https://www.sanborns.com.mx/search?q=iphone+13+128gb"
    },
    {
      id: "ELEC_CEL_006",
      nombre: "Samsung Galaxy S23 Ultra",
      marca: "Samsung",
      categoria: "Electrónicos",
      precio: 25499,
      descuento: 15,
      precio_final: 21499,
      imagen: "https://resources.claroshop.com/medios-plazavip/publicidad/65b8455e49643_s24-ultra-negro-celulares-nochitlan-01jpg.jpg",
      descripcion: "256GB Negro Snapdragon Desbloqueado",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["celular", "samsung", "premium", "fotografia", "flagship"],
      url_compra: "https://www.sanborns.com.mx/search?q=samsung+galaxy+s23+ultra"
    },
    {
      id: "ELEC_CEL_007",
      nombre: "Motorola G34 5G",
      marca: "Motorola",
      categoria: "Electrónicos",
      precio: 4999,
      descuento: 30,
      precio_final: 3499,
      imagen: "https://resources.claroshop.com/medios-plazavip/publicidad/63363a84afcc1_motorola-moto-g62-5g-thumb-mobelat-370x400-1-jpg.jpg",
      descripcion: "256GB Negro Telcel con 5G",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["celular", "motorola", "economico", "5g", "telcel"],
      url_compra: "https://www.sanborns.com.mx/search?q=motorola+g34+5g"
    },
    {
      id: "ELEC_CEL_044",
      nombre: "iPhone 16 128GB Rosa",
      marca: "Apple",
      categoria: "Electrónicos",
      precio: 23999,
      descuento: 16,
      precio_final: 19999,
      imagen: "https://www.sanborns.com.mx/c/apple/iphone/iphone-16-modelos.jpg",
      descripcion: "Reacondicionado con garantía",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["celular", "iphone", "apple", "nuevo", "premium"],
      url_compra: "https://www.sanborns.com.mx/search?q=iphone+16+128gb"
    },
    {
      id: "ELEC_CEL_045",
      nombre: "Oppo A60 256GB",
      marca: "Oppo",
      categoria: "Electrónicos",
      precio: 6999,
      descuento: 31,
      precio_final: 4799,
      imagen: "https://resources.claroshop.com/imgsplaza-sears/sears/?tp=f&id=3599898&t=340x260",
      descripcion: "Blanco Telcel con gran batería",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["celular", "oppo", "economico", "bateria", "telcel"],
      url_compra: "https://www.sanborns.com.mx/search?q=oppo+a60"
    }
  ],
  
  "consola": [
    {
      id: "ELEC_GAME_008",
      nombre: "PlayStation 5 Digital + Juegos",
      marca: "Sony",
      categoria: "Electrónicos",
      precio: 11069,
      descuento: 20,
      precio_final: 8849,
      imagen: "https://www.sanborns.com.mx/c/hotsale/base/images/hotsale-celulares.png",
      descripcion: "1TB Bundle con Astro Bot y GT7",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["consola", "playstation", "ps5", "videojuegos", "gaming"],
      url_compra: "https://www.sanborns.com.mx/search?q=playstation+5"
    },
    {
      id: "ELEC_GAME_009",
      nombre: "Nintendo Switch OLED + Mario Kart 8",
      marca: "Nintendo",
      categoria: "Electrónicos",
      precio: 9999,
      descuento: 15,
      precio_final: 8499,
      imagen: "https://www.sanborns.com.mx/c/hotsale/base/images/hotsale-celulares.png",
      descripcion: "Consola White con juego incluido",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["consola", "nintendo", "switch", "mario", "videojuegos", "familiar"],
      url_compra: "https://www.sanborns.com.mx/search?q=nintendo+switch+oled"
    }
  ],
  
  "juguetes": [
    {
      id: "JUG_CONST_011",
      nombre: "LEGO Harry Potter Hogwarts",
      marca: "LEGO",
      categoria: "Juguetes",
      precio: 1299,
      descuento: 0,
      precio_final: 1299,
      imagen: "https://www.sanborns.com.mx/cat/juguetes%20y%20dulces/juguetes/construcci%C3%B3n?id=40113",
      descripcion: "Castillo - Clase de Herbología",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["juguete", "lego", "construccion", "harry potter", "coleccionable", "niños"],
      url_compra: "https://www.sanborns.com.mx/search?q=lego+harry+potter"
    },
    {
      id: "JUG_CONST_012",
      nombre: "LEGO Speed Champions Porsche",
      marca: "LEGO",
      categoria: "Juguetes",
      precio: 699,
      descuento: 0,
      precio_final: 699,
      imagen: "https://www.sanborns.com.mx/cat/juguetes%20y%20dulces/juguetes/construcci%C3%B3n?id=40113",
      descripcion: "Porsche 911 GT3 RS armable",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["juguete", "lego", "construccion", "autos", "coleccionable"],
      url_compra: "https://www.sanborns.com.mx/search?q=lego+speed+champions+porsche"
    },
    {
      id: "JUG_CONST_013",
      nombre: "LEGO Minecraft La Mina",
      marca: "LEGO",
      categoria: "Juguetes",
      precio: 1449,
      descuento: 0,
      precio_final: 1449,
      imagen: "https://www.sanborns.com.mx/cat/juguetes%20y%20dulces/juguetes/construcci%C3%B3n?id=40113",
      descripcion: "Mina de Pico con personajes",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["juguete", "lego", "minecraft", "construccion", "videojuegos", "niños"],
      url_compra: "https://www.sanborns.com.mx/search?q=lego+minecraft"
    },
    {
      id: "JUG_HW_015",
      nombre: "Hot Wheels Mercedes-Benz 300 SL",
      marca: "Hot Wheels",
      categoria: "Juguetes",
      precio: 3709,
      descuento: 0,
      precio_final: 3709,
      imagen: "https://www.sanborns.com.mx/cat/juguetes%20y%20dulces/juguetes/construcci%C3%B3n?id=40113",
      descripcion: "Premium Escala 1:12 Armable",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["juguete", "hot wheels", "auto", "coleccionable", "premium"],
      url_compra: "https://www.sanborns.com.mx/search?q=hot+wheels+mercedes"
    },
    {
      id: "JUG_MARIO_016",
      nombre: "LEGO Super Mario Kart",
      marca: "LEGO",
      categoria: "Juguetes",
      precio: 1299,
      descuento: 0,
      precio_final: 1299,
      imagen: "https://www.sanborns.com.mx/c/mario-day",
      descripcion: "Mario interactivo con sonidos",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["juguete", "lego", "mario", "nintendo", "interactivo", "niños"],
      url_compra: "https://www.sanborns.com.mx/search?q=lego+super+mario"
    },
    {
      id: "JUG_MESA_017",
      nombre: "Super Mario vs Bowser Checkers",
      marca: "Nintendo",
      categoria: "Juguetes",
      precio: 329,
      descuento: 30,
      precio_final: 230,
      imagen: "https://www.sanborns.com.mx/c/mario-day",
      descripcion: "Juego de mesa familiar",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["juguete", "juego mesa", "mario", "familiar", "economico"],
      url_compra: "https://www.sanborns.com.mx/search?q=super+mario+checkers"
    },
    {
      id: "JUG_FIG_014",
      nombre: "Figura Minis Fórmula 1",
      marca: "Fotorama",
      categoria: "Juguetes",
      precio: 469,
      descuento: 70,
      precio_final: 140,
      imagen: "https://www.sanborns.com.mx/c/carrera/",
      descripcion: "Colección surtida de F1",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["juguete", "formula 1", "autos", "coleccionable", "oferta"],
      url_compra: "https://www.sanborns.com.mx/search?q=figura+formula+1"
    }
  ],
  
  "videojuegos": [
    {
      id: "JUG_VID_046",
      nombre: "F1 25 Sports",
      marca: "EA Sports",
      categoria: "Videojuegos",
      precio: 1799,
      descuento: 40,
      precio_final: 1079,
      imagen: "https://www.sanborns.com.mx/c/carrera/",
      descripcion: "Para PlayStation 5",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["videojuego", "ps5", "formula 1", "carreras", "deportes"],
      url_compra: "https://www.sanborns.com.mx/search?q=f1+25+ps5"
    },
    {
      id: "JUG_ACC_047",
      nombre: "Nintendo Switch Pro Controller",
      marca: "Nintendo",
      categoria: "Accesorios",
      precio: 1899,
      descuento: 10,
      precio_final: 1709,
      imagen: "https://www.sanborns.com.mx/c/hotsale/nintendo/",
      descripcion: "Control inalámbrico Negro",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["accesorio", "nintendo", "control", "switch", "gaming"],
      url_compra: "https://www.sanborns.com.mx/search?q=nintendo+switch+pro+controller"
    },
    {
      id: "JUG_VID_052",
      nombre: "Dragon Ball Sparking Zero",
      marca: "Bandai Namco",
      categoria: "Videojuegos",
      precio: 1499,
      descuento: 17,
      precio_final: 1239,
      imagen: "https://www.sanborns.com.mx/c/hotsale/nintendo/",
      descripcion: "Para Nintendo Switch",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["videojuego", "dragon ball", "anime", "pelea", "switch"],
      url_compra: "https://www.sanborns.com.mx/search?q=dragon+ball+sparking+zero"
    }
  ],
  
  "perfumes": [
    {
      id: "PERF_DAMA_018",
      nombre: "Carolina Herrera Good Girl",
      marca: "Carolina Herrera",
      categoria: "Perfumes",
      precio: 3500,
      descuento: 0,
      precio_final: 3500,
      imagen: "https://resources.claroshop.com/imagenes-sanborns-ii/1200/8411061991886.jpg",
      descripcion: "EDP 80ml para mujer",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "mujer", "dama", "elegante", "fragancia", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=carolina+herrera+good+girl"
    },
    {
      id: "PERF_CAB_019",
      nombre: "Dior Sauvage",
      marca: "Dior",
      categoria: "Perfumes",
      precio: 6679,
      descuento: 23,
      precio_final: 5138,
      imagen: "https://www.sanborns.com.mx/c/perfumes/img/marcas/givechy.png",
      descripcion: "Eau De Parfum Spray 3.4oz",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "hombre", "caballero", "premium", "dior", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=dior+sauvage"
    },
    {
      id: "PERF_CAB_020",
      nombre: "Versace Eros",
      marca: "Versace",
      categoria: "Perfumes",
      precio: 3300,
      descuento: 0,
      precio_final: 3300,
      imagen: "https://www.sanborns.com.mx/c/hotsale/base/images/hotsale-perfume.png",
      descripcion: "EDP 100 ML para hombre",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "hombre", "caballero", "elegante", "versace", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=versace+eros"
    },
    {
      id: "PERF_DAMA_021",
      nombre: "La Vie Est Belle",
      marca: "Lancôme",
      categoria: "Perfumes",
      precio: 3700,
      descuento: 0,
      precio_final: 3700,
      imagen: "https://www.sanborns.com.mx/c/perfumes/img/25/991x608-mujer.jpg",
      descripcion: "Edp 100 ml para mujer",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "mujer", "dama", "elegante", "lancome", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=la+vie+est+belle+lancome"
    },
    {
      id: "PERF_CAB_022",
      nombre: "Jean Paul Gaultier Le Beau",
      marca: "Jean Paul Gaultier",
      categoria: "Perfumes",
      precio: 3380,
      descuento: 0,
      precio_final: 3380,
      imagen: "https://www.sanborns.com.mx/c/perfumes/img/25/991x608-hombre.jpg",
      descripcion: "EDP 125ml para caballero",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "hombre", "caballero", "regalo", "jean paul gaultier"],
      url_compra: "https://www.sanborns.com.mx/search?q=jean+paul+gaultier+le+beau"
    },
    {
      id: "PERF_DAMA_023",
      nombre: "Ariana Grande CLOUD",
      marca: "Ariana Grande",
      categoria: "Perfumes",
      precio: 2100,
      descuento: 0,
      precio_final: 2100,
      imagen: "https://www.sanborns.com.mx/c/perfumes/img/marcas/dkny.png",
      descripcion: "100 ml EDT para mujer",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "mujer", "joven", "dulce", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=ariana+grande+cloud"
    },
    {
      id: "PERF_CAB_024",
      nombre: "Montblanc Explorer",
      marca: "Montblanc",
      categoria: "Perfumes",
      precio: 2920,
      descuento: 0,
      precio_final: 2920,
      imagen: "https://www.sanborns.com.mx/c/perfumes/img/marcas/mont.png",
      descripcion: "EDP 100ml para hombre",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "hombre", "aventura", "elegante", "montblanc"],
      url_compra: "https://www.sanborns.com.mx/search?q=montblanc+explorer"
    },
    {
      id: "PERF_SET_048",
      nombre: "Carolina Herrera Very Good Girl Set",
      marca: "Carolina Herrera",
      categoria: "Perfumes",
      precio: 4025,
      descuento: 0,
      precio_final: 4025,
      imagen: "https://www.sanborns.com.mx/c/perfumes/img/navidad/3000x700-set.jpg",
      descripcion: "Set Elixir completo",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "mujer", "set", "regalo", "navidad", "premium"],
      url_compra: "https://www.sanborns.com.mx/search?q=carolina+herrera+very+good+girl+set"
    },
    {
      id: "PERF_CAB_049",
      nombre: "Hugo Man",
      marca: "Hugo Boss",
      categoria: "Perfumes",
      precio: 2700,
      descuento: 0,
      precio_final: 2700,
      imagen: "https://www.sanborns.com.mx/c/perfumes/img/marcas/boss.png",
      descripcion: "EDT 125ml para caballero",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "hombre", "fresco", "hugo boss", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=hugo+boss+man"
    },
    {
      id: "PERF_CAB_053",
      nombre: "Le Male Elixir",
      marca: "Jean Paul Gaultier",
      categoria: "Perfumes",
      precio: 3420,
      descuento: 0,
      precio_final: 3420,
      imagen: "https://www.sanborns.com.mx/c/hotsale/base/images/hotsale-perfume.png",
      descripcion: "Eau de Parfum 125ml",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["perfume", "hombre", "intenso", "premium", "regalo"],
      url_compra: "https://www.sanborns.com.mx/search?q=le+male+elixir"
    }
  ],
  
  "hogar": [
    {
      id: "HOG_ELEC_025",
      nombre: "Licuadora Oster V/Vidrio",
      marca: "Oster",
      categoria: "Hogar",
      precio: 2399,
      descuento: 26,
      precio_final: 1775,
      imagen: "https://www.sanborns.com.mx/cat/hogar%20y%20oficina?id=1&brand=OSTER",
      descripcion: "BLSTPEG-BPB 800W Negro",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["hogar", "cocina", "licuadora", "electrodomestico", "oster"],
      url_compra: "https://www.sanborns.com.mx/search?q=licuadora+oster"
    },
    {
      id: "HOG_ELEC_026",
      nombre: "Freidora de Aire Oster 3.2 L",
      marca: "Oster",
      categoria: "Hogar",
      precio: 3242,
      descuento: 23,
      precio_final: 2494,
      imagen: "https://www.sanborns.com.mx/cat/hogar%20y%20oficina?id=1&brand=OSTER",
      descripcion: "Digital con temporizador",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["hogar", "cocina", "freidora", "aire", "saludable", "oster"],
      url_compra: "https://www.sanborns.com.mx/search?q=freidora+de+aire+oster"
    },
    {
      id: "HOG_ELEC_027",
      nombre: "Cafetera Nespresso Vertuo Pop",
      marca: "Breville",
      categoria: "Hogar",
      precio: 5188,
      descuento: 23,
      precio_final: 3991,
      imagen: "https://www.sanborns.com.mx/cat/hogar%20y%20oficina/electrodom%C3%A9sticos?id=108",
      descripcion: "Color Rojo con sistema Vertuo",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["hogar", "cafe", "cafetera", "nespresso", "premium"],
      url_compra: "https://www.sanborns.com.mx/search?q=nespresso+vertuo+pop"
    },
    {
      id: "HOG_ELEC_028",
      nombre: "Horno Eléctrico Koblenz",
      marca: "Koblenz",
      categoria: "Hogar",
      precio: 2999,
      descuento: 27,
      precio_final: 2189,
      imagen: "https://www.sanborns.com.mx/cat/hogar%20y%20oficina/electrodom%C3%A9sticos?id=108",
      descripcion: "HKM-1500 S Convección 32 L",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["hogar", "cocina", "horno", "hornear", "conveccion"],
      url_compra: "https://www.sanborns.com.mx/search?q=horno+electrico+koblenz"
    },
    {
      id: "HOG_ELEC_029",
      nombre: "Sandwichera Oster Compacta",
      marca: "Oster",
      categoria: "Hogar",
      precio: 1949,
      descuento: 18,
      precio_final: 1579,
      imagen: "https://www.sanborns.com.mx/cat/hogar%20y%20oficina?id=1&brand=OSTER",
      descripcion: "Grill para 2 rebanadas",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["hogar", "cocina", "sandwichera", "practico", "oster"],
      url_compra: "https://www.sanborns.com.mx/search?q=sandwichera+oster"
    },
    {
      id: "HOG_DEC_030",
      nombre: "Árbol Navideño 210 Cm",
      marca: "Generic",
      categoria: "Hogar",
      precio: 3908,
      descuento: 49,
      precio_final: 1959,
      imagen: "https://www.sanborns.com.mx/c/hogar/",
      descripcion: "Esponjado Verde Artificial",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["hogar", "decoracion", "navidad", "arbol", "oferta"],
      url_compra: "https://www.sanborns.com.mx/search?q=arbol+navideño"
    },
    {
      id: "HOG_ELEC_054",
      nombre: "Plancha de vapor Oster",
      marca: "Oster",
      categoria: "Hogar",
      precio: 791,
      descuento: 23,
      precio_final: 608,
      imagen: "https://www.sanborns.com.mx/cat/hogar%20y%20oficina?id=1&brand=OSTER",
      descripcion: "GCSTBS5051-013 Azul Celeste",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["hogar", "plancha", "ropa", "vapor", "oster"],
      url_compra: "https://www.sanborns.com.mx/search?q=plancha+oster"
    }
  ],
  
  "libros": [
    {
      id: "LIB_BEST_031",
      nombre: "Hábitos atómicos",
      marca: "Editorial",
      categoria: "Libros",
      precio: 459,
      descuento: 0,
      precio_final: 459,
      imagen: "https://www.sanborns.com.mx/c/libros/base/images/libro-autoayuda.webp",
      descripcion: "Tapa dura - James Clear",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["libro", "autoayuda", "bestseller", "desarrollo personal"],
      url_compra: "https://www.sanborns.com.mx/search?q=habitos+atomicos"
    },
    {
      id: "LIB_BEST_032",
      nombre: "Este dolor no es mío",
      marca: "Editorial",
      categoria: "Libros",
      precio: 395,
      descuento: 0,
      precio_final: 395,
      imagen: "https://www.sanborns.com.mx/c/libros/base/images/libro-psicologia.webp",
      descripcion: "Mark Wolynn - Psicología",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["libro", "psicologia", "salud mental", "autoayuda"],
      url_compra: "https://www.sanborns.com.mx/search?q=este+dolor+no+es+mio"
    },
    {
      id: "LIB_HP_033",
      nombre: "Paquete Harry Potter",
      marca: "Editorial",
      categoria: "Libros",
      precio: 2299,
      descuento: 0,
      precio_final: 2299,
      imagen: "https://www.sanborns.com.mx/c/libros/base/images/libros-harry-potter.webp",
      descripcion: "Colección completa de libros",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["libro", "harry potter", "fantasia", "juvenil", "coleccion"],
      url_compra: "https://www.sanborns.com.mx/search?q=harry+potter+coleccion"
    },
    {
      id: "LIB_HIST_034",
      nombre: "Historia de México",
      marca: "Editorial",
      categoria: "Libros",
      precio: 349,
      descuento: 0,
      precio_final: 349,
      imagen: "https://www.sanborns.com.mx/c/libros/historia-de-mexico-sanborns.jpg",
      descripcion: "Ensayo y Memoria Tomo I y II",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["libro", "historia", "mexico", "educativo"],
      url_compra: "https://www.sanborns.com.mx/search?q=historia+de+mexico"
    },
    {
      id: "LIB_BEST_035",
      nombre: "Alas de ónix",
      marca: "Editorial",
      categoria: "Libros",
      precio: 398,
      descuento: 0,
      precio_final: 398,
      imagen: "https://www.sanborns.com.mx/c/libros/base/images/libros-juveniles.webp",
      descripcion: "Rebecca Yarros - Fantasía",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["libro", "fantasia", "juvenil", "bestseller", "romance"],
      url_compra: "https://www.sanborns.com.mx/search?q=alas+de+onix"
    },
    {
      id: "LIB_BEST_050",
      nombre: "Tan poca vida",
      marca: "Editorial",
      categoria: "Libros",
      precio: 599,
      descuento: 0,
      precio_final: 599,
      imagen: "https://www.sanborns.com.mx/c/libros/base/images/libros-novelas.webp",
      descripcion: "Hanya Yanagihara - Novela",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["libro", "novela", "drama", "bestseller"],
      url_compra: "https://www.sanborns.com.mx/search?q=tan+poca+vida"
    }
  ],
  
  "relojes": [
    {
      id: "ROPA_ACC_036",
      nombre: "Reloj Casio Vintage A158WA-1R",
      marca: "Casio",
      categoria: "Ropa/Accesorios",
      precio: 649,
      descuento: 20,
      precio_final: 519,
      imagen: "https://www.sanborns.com.mx/c/relojes/casio/",
      descripcion: "Unisex digital plateado",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["reloj", "casio", "vintage", "retro", "unisex", "accesorio"],
      url_compra: "https://www.sanborns.com.mx/search?q=casio+vintage+a158"
    },
    {
      id: "ROPA_ACC_037",
      nombre: "Reloj Casio G-Shock",
      marca: "Casio",
      categoria: "Ropa/Accesorios",
      precio: 4499,
      descuento: 20,
      precio_final: 3599,
      imagen: "https://www.sanborns.com.mx/c/relojes/casio/g-shock/",
      descripcion: "Para Hombre resistente",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["reloj", "casio", "g-shock", "deportivo", "resistente", "hombre"],
      url_compra: "https://www.sanborns.com.mx/search?q=casio+g-shock"
    },
    {
      id: "ROPA_ACC_040",
      nombre: "Reloj Citizen Eco Drive",
      marca: "Citizen",
      categoria: "Ropa/Accesorios",
      precio: 6840,
      descuento: 20,
      precio_final: 5472,
      imagen: "https://www.sanborns.com.mx/c/relojes/citizen/mujer/",
      descripcion: "61890 para Mujer elegante",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["reloj", "citizen", "mujer", "elegante", "eco drive", "premium"],
      url_compra: "https://www.sanborns.com.mx/search?q=citizen+eco+drive+mujer"
    },
    {
      id: "ROPA_ACC_055",
      nombre: "Reloj Casio Vintage Dorado",
      marca: "Casio",
      categoria: "Ropa/Accesorios",
      precio: 1549,
      descuento: 20,
      precio_final: 1239,
      imagen: "https://www.sanborns.com.mx/c/relojes/casio/",
      descripcion: "A168WG-9VT Unisex",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["reloj", "casio", "vintage", "dorado", "retro", "unisex"],
      url_compra: "https://www.sanborns.com.mx/search?q=casio+vintage+dorado"
    }
  ],
  
  "bolsas": [
    {
      id: "ROPA_ACC_038",
      nombre: "Bolsa Barbie By Gorett",
      marca: "Gorett",
      categoria: "Ropa/Accesorios",
      precio: 1899,
      descuento: 51,
      precio_final: 930,
      imagen: "https://www.sanborns.com.mx/c/moda/",
      descripcion: "Satchel Rosa Para Mujer",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["bolsa", "mujer", "barbie", "rosa", "moda", "oferta"],
      url_compra: "https://www.sanborns.com.mx/search?q=bolsa+barbie+gorett"
    },
    {
      id: "ROPA_ACC_039",
      nombre: "Bolsa Tote Westies",
      marca: "Westies",
      categoria: "Ropa/Accesorios",
      precio: 1799,
      descuento: 0,
      precio_final: 1799,
      imagen: "https://www.sanborns.com.mx/c/westies/bolsas/",
      descripcion: "Negro para Mujer elegante",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["bolsa", "mujer", "negro", "elegante", "westies", "moda"],
      url_compra: "https://www.sanborns.com.mx/search?q=bolsa+westies"
    }
  ],
  
  "pantallas": [
    {
      id: "ELEC_TV_041",
      nombre: "Pantalla Samsung 65 Pulgadas",
      marca: "Samsung",
      categoria: "Electrónicos",
      precio: 19285,
      descuento: 30,
      precio_final: 13495,
      imagen: "https://www.sanborns.com.mx/c/buen-fin/pantalla-75-pulgadas/",
      descripcion: "Qn65q7f5afxz 4K Smart TV",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["pantalla", "tv", "samsung", "4k", "smart tv", "grande"],
      url_compra: "https://www.sanborns.com.mx/search?q=samsung+65+pulgadas+4k"
    },
    {
      id: "ELEC_STREAM_042",
      nombre: "Roku Streaming Stick 4K",
      marca: "Roku",
      categoria: "Electrónicos",
      precio: 1499,
      descuento: 20,
      precio_final: 1199,
      imagen: "https://www.sanborns.com.mx/c/buen-fin/roku/",
      descripcion: "Streaming 4K con control remoto",
      disponible_pickup: true,
      tiendas_cercanas: ["Consultar disponibilidad"],
      stock: "Disponible",
      tags: ["streaming", "roku", "4k", "entretenimiento", "tv"],
      url_compra: "https://www.sanborns.com.mx/search?q=roku+streaming+stick+4k"
    }
  ]
};

// Sistema de búsqueda inteligente
class ProductMatcher {
  constructor(database) {
    this.database = database;
  }
  
  findProducts(userMessage) {
    const message = userMessage.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    let matches = [];
    
    const keywords = {
      "audifonos": ["audifono", "audifonos", "auricular", "headphone", "escuchar", "musica", "ejercicio", "beats", "sony", "cancelacion ruido"],
      "tablet": ["tablet", "ipad", "tab", "pantalla tactil", "samsung galaxy", "fire", "infantil", "lenovo"],
      "celular": ["celular", "telefono", "smartphone", "iphone", "samsung", "motorola", "movil", "oppo", "apple"],
      "consola": ["consola", "playstation", "ps5", "nintendo", "switch", "videojuego", "gaming", "jugar"],
      "juguetes": ["juguete", "juego", "nino", "nina", "lego", "muneca", "hot wheels", "mario", "minecraft", "figura"],
      "videojuegos": ["videojuego", "juego", "f1", "dragon ball", "control", "gaming"],
      "perfumes": ["perfume", "fragancia", "aroma", "colonia", "olor", "dior", "carolina herrera", "versace", "hugo", "lancome"],
      "hogar": ["hogar", "casa", "cocina", "licuadora", "freidora", "cafetera", "horno", "electrodomestico", "oster", "navidad", "arbol", "plancha"],
      "libros": ["libro", "leer", "lectura", "novela", "harry potter", "historia"],
      "relojes": ["reloj", "casio", "citizen", "g-shock", "hora"],
      "bolsas": ["bolsa", "bolso", "mochila", "barbie", "westies"],
      "pantallas": ["pantalla", "tv", "television", "roku", "streaming", "samsung"]
    };
    
    for (const [category, words] of Object.entries(keywords)) {
      for (const word of words) {
        if (message.includes(word)) {
          if (this.database[category]) {
            matches = matches.concat(this.database[category]);
          }
          break;
        }
      }
    }
    
    if (matches.length === 0) {
      for (const category in this.database) {
        this.database[category].forEach(product => {
          product.tags.forEach(tag => {
            if (message.includes(tag) && !matches.find(m => m.id === product.id)) {
              matches.push(product);
            }
          });
        });
      }
    }
    
    matches = [...new Map(matches.map(item => [item.id, item])).values()];
    
    return matches.slice(0, 3);
  }
  
  generateResponse(products) {
    if (products.length === 0) {
      return {
        message: "No encontré productos exactos, pero mira estas recomendaciones navideñas:",
        products: this.getRandomProducts(3)
      };
    }
    
    return {
      message: `¡Los Reyes Magos encontraron ${products.length} ${products.length === 1 ? 'opción perfecta' : 'opciones perfectas'} para ti:`,
      products: products
    };
  }
  
  getRandomProducts(count) {
    const allProducts = [];
    for (const category in this.database) {
      allProducts.push(...this.database[category]);
    }
    return allProducts.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}

window.productsDatabase = productsDatabase;
window.ProductMatcher = ProductMatcher;

console.log('📦 Base de datos de productos Sanborns cargada:', Object.keys(productsDatabase).length, 'categorías');
