async function comprobarDirecto() {

    const banner = document.getElementById("live-banner");
    const enlace = document.getElementById("live-link");

    if (!banner || !enlace) return;

    try {

        /*
         * Obtenemos los últimos vídeos del canal
         * desde la playlist de subidos.
         */

        const respuesta = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${UPLOADS_PLAYLIST_ID}&part=snippet,contentDetails&maxResults=10`
        );

        const datos = await respuesta.json();

        if (!datos.items || datos.items.length === 0) {

            banner.classList.add("hidden-live");

            return;
        }


        /*
         * Sacamos los IDs de los vídeos.
         */

        const ids = datos.items
            .map(item => item.contentDetails.videoId)
            .join(",");


        /*
         * Consultamos si alguno está actualmente
         * emitiendo en directo.
         */

        const respuestaVideos = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${ids}&part=snippet,liveStreamingDetails`
        );

        const videos = await respuestaVideos.json();


        const directo = videos.items?.find(video => {

            return (
                video.snippet.liveBroadcastContent === "live"
            );

        });


        if (directo) {

            enlace.href =
                `https://www.youtube.com/watch?v=${directo.id}`;

            banner.classList.remove("hidden-live");

        } else {

            banner.classList.add("hidden-live");

        }

    } catch (error) {

        console.error(
            "Error comprobando directo:",
            error
        );

        banner.classList.add("hidden-live");

    }

}


/*
 * Comprobación inicial.
 */

comprobarDirecto();