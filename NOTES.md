# Original URL
https://collegerama.tudelft.nl/Mediasite/Play/5acf0cf7333441b4b518bb3125253a131d

# Video
wget "https://collegerama-vs-stream-v6.tudelft.net/SmoothStreaming7/mp4/173ba0cf-d419-46ec-b453-66a886f0b669.mp4?playbackTicket=e01865c9c11c4375b5fbf2e5e6786e45&site=collegerama.tudelft.nl&sf-uniquify=1416734344651" > cc-12.mp4

# Slides
https://collegerama.tudelft.nl/Mediasite/FileServer/d91dca0351ea4d579f07d9627b59a55c29/Presentation/5acf0cf7333441b4b518bb3125253a131d/slide_0008.jpg

    # Groot
    https://collegerama.tudelft.nl/Mediasite/FileServer/d91dca0351ea4d579f07d9627b59a55c29/Presentation/5acf0cf7333441b4b518bb3125253a131d/slide_0009.jpg

    # Klein
    https://collegerama.tudelft.nl/Mediasite/FileServer/d91dca0351ea4d579f07d9627b59a55c29/Presentation/5acf0cf7333441b4b518bb3125253a131d/slide_0009_819_512.jpg


    # Groot
    https://collegerama.tudelft.nl/Mediasite/FileServer/d91dca0351ea4d579f07d9627b59a55c29/Presentation/5acf0cf7333441b4b518bb3125253a131d/slide_0010.jpg

    # Klein
    https://collegerama.tudelft.nl/Mediasite/FileServer/d91dca0351ea4d579f07d9627b59a55c29/Presentation/5acf0cf7333441b4b518bb3125253a131d/slide_0010_819_512.jpg

# PlayerService
POST https://collegerama.tudelft.nl/Mediasite/PlayerService/PlayerService.svc/json/GetPlayerOptions

{'getPlayerOptionsRequest':{'ResourceId':'5acf0cf7333441b4b518bb3125253a131d','QueryString':'','UseScreenReader':false,'UrlReferrer':''}}

curl \
    -H "Content-Type: application/json; charset=UTF-8" \
    -d '{"getPlayerOptionsRequest":{"ResourceId":"5acf0cf7333441b4b518bb3125253a131d","QueryString":"?catalog=528e5b24-a2fc-4def-870e-65bd84b28a8c","UseScreenReader":false,"UrlReferrer":"http://collegerama.tudelft.nl/Mediasite/Catalog/Full/528e5b24a2fc4def870e65bd84b28a8c21"}}' \
    https://collegerama.tudelft.nl/Mediasite/PlayerService/PlayerService.svc/json/GetPlayerOptions > data.json

res.d.Presentation.Streams[0].SlideBaseUrl
res.d.Presentation.Streams[0].SlideImageFileNameTemplate
res.d.Presentation.Streams[0].Slides.forEach(function (slide) {
    console.log(slide.Number + " => " + slide.Time);
});