// https://developers.google.com/youtube/v3/code_samples?hl=es-419

// Parámetro key
// GET https://www.googleapis.com/youtube/v3/channels

// Parameters:
// id
// forHandle
// forUsername

// Return
// snippet - object
// snippet.title
// snippet.description
// snippet.defaultLanguage
// snippet.customUrl ?
// snippet.thumbnails (list)
// snippet.thumbnails.[default,medium,high].url
// contentDetails.relatedPlaylists.uploads (id playlist)

// GET https://www.googleapis.com/youtube/v3/playlistItems
// Parameters:
// playlistId
// maxResults (default 5)

// Return:
// items[]
// snippet.title
// snippet.description
// snippet.thumbnails.(key).url
// snippet.thumbnails.(key).url
// contentDetails.videoId (para la url?)

cronAdd('links-youtube-cron', '*/5 * * * *', async () => {
    const RECORD_LIMIT = 10

    const result = await $app.findRecordsByFilter('links', 'og_image = ""', '', RECORD_LIMIT, 1)

    console.log('Processing ' + result.length + ' Youtube links without metadata.')
})
