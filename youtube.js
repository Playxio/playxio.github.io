async function cargarVideos() {

    const contenedor = document.getElementById("youtube-videos");

    if (!contenedor) return;

    try {

        const respuesta = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${UPLOADS_PLAYLIST_ID}&part=snippet,contentDetails&maxResults=4`
        );

        const datos = await respuesta.json();

        if (!datos.items) {

            console.error("Error YouTube:", datos);

            contenedor.innerHTML =
                "<p>No se pudieron cargar los vídeos.</p>";

            return;
        }

        contenedor.innerHTML = "";

        const destacado =
            document.getElementById("featured-video");


        /* ===========================
           VÍDEO DESTACADO
        =========================== */

        if (destacado && datos.items.length > 0) {

            const primero = datos.items[0];

            const videoId =
                primero.contentDetails.videoId;

            destacado.innerHTML = `
                <iframe
                    width="100%"
                    height="600"
                    src="https://www.youtube.com/embed/${videoId}"
                    title="${primero.snippet.title}"
                    frameborder="0"
                    allowfullscreen>
                </iframe>

                <div class="featured-info">

                    <h3>
                        ${primero.snippet.title}
                    </h3>

                </div>
            `;
        }


        /* ===========================
           ÚLTIMOS VÍDEOS
        =========================== */

        datos.items.slice(1).forEach(video => {

            const videoId =
                video.contentDetails.videoId;

            const fecha =
                new Date(video.snippet.publishedAt);

            const fechaTexto =
                fecha.toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

            contenedor.innerHTML += `
                <div class="video-card">

                    <img
                        src="${video.snippet.thumbnails.high.url}"
                        alt="${video.snippet.title}"
                    >

                    <div class="video-info">

                        <h3>
                            ${video.snippet.title}
                        </h3>

                        <p class="video-date">
                            📅 ${fechaTexto}
                        </p>

                        <a
                            href="https://www.youtube.com/watch?v=${videoId}"
                            target="_blank"
                        >
                            ▶ Ver vídeo
                        </a>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error(
            "Error cargando vídeos:",
            error
        );

        contenedor.innerHTML =
            "<p>Error cargando vídeos.</p>";

    }

}


async function cargarShorts() {

    const contenedor =
        document.getElementById("youtube-shorts");

    if (!contenedor) return;

    try {

        const respuesta = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${UPLOADS_PLAYLIST_ID}&part=snippet,contentDetails&maxResults=15`
        );

        const datos = await respuesta.json();

        if (!datos.items) {

            console.error("Error YouTube Shorts:", datos);

            contenedor.innerHTML =
                "<p>No se pudieron cargar los Shorts.</p>";

            return;
        }

        contenedor.innerHTML = "";

        let encontrados = 0;


        for (const video of datos.items) {

            if (encontrados >= 4) break;


            const titulo =
                video.snippet.title;

            /*
             * De momento identificamos los Shorts
             * por #shorts en el título.
             */

            if (
                !titulo
                    .toLowerCase()
                    .includes("#shorts")
            ) {
                continue;
            }


            const videoId =
                video.contentDetails.videoId;

            const url =
                `https://www.youtube.com/watch?v=${videoId}`;


            const fecha =
                new Date(video.snippet.publishedAt);

            const fechaTexto =
                fecha.toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });


            contenedor.innerHTML += `

                <div class="short-card">

                    <a
                        href="${url}"
                        target="_blank"
                    >

                        <img
                            src="${video.snippet.thumbnails.high.url}"
                            alt="${titulo}"
                        >

                        <div class="short-info">

                            <h3>
                                ${titulo}
                            </h3>

                            <p>
                                📅 ${fechaTexto}
                            </p>

                            <span>
                                ▶ Ver Short
                            </span>

                        </div>

                    </a>

                </div>

            `;


            encontrados++;

        }


        if (encontrados === 0) {

            contenedor.innerHTML =
                "<p>No se encontraron Shorts recientes.</p>";

        }

    } catch (error) {

        console.error(
            "Error cargando Shorts:",
            error
        );

        contenedor.innerHTML =
            "<p>Error cargando Shorts.</p>";

    }

}

async function cargarEstadisticas() {

    try {

        const respuesta = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${CHANNEL_ID}&part=statistics`
        );

        const datos = await respuesta.json();

        if (!datos.items || !datos.items.length) return;

        const estadisticas =
            datos.items[0].statistics;

        const suscriptores =
            document.getElementById("youtube-subs");

        const visualizaciones =
            document.getElementById("youtube-views");

        const videos =
            document.getElementById("youtube-count");


        function animarNumero(elemento, objetivo) {

            let actual = 0;

            const incremento = objetivo / 60;

            function actualizar() {

                actual += incremento;

                if (actual < objetivo) {

                    elemento.textContent =
                        Math.floor(actual)
                            .toLocaleString("es-ES");

                    requestAnimationFrame(actualizar);

                } else {

                    elemento.textContent =
                        objetivo.toLocaleString("es-ES");

                }

            }

            actualizar();

        }


        if (suscriptores) {

            animarNumero(
                suscriptores,
                Number(estadisticas.subscriberCount)
            );

        }


        if (visualizaciones) {

            animarNumero(
                visualizaciones,
                Number(estadisticas.viewCount)
            );

        }


        if (videos) {

            animarNumero(
                videos,
                Number(estadisticas.videoCount)
            );

        }

    } catch (error) {

        console.error(
            "Error cargando estadísticas:",
            error
        );

    }
}


cargarVideos();
cargarShorts();
cargarEstadisticas();