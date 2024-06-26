// window.onload = () => {
    let db;

    const DBOpenRequest = window.indexedDB.open("xpotify", 4);

    const song = [
        {
            "id" : "6FYbr9QzRoZPh0Re8lDO9z",
            "artist" : {
                "id": "3QSQFmccmX81fWCUSPTS7y",
                "name" : "Dean Lewis"
            },
            "trackName" : "7 Minutes",
            "audioSrcPath" : "test7.mp3",
            "album" : {
                "name" : "A Place We Knew",
                "id" : "61G7KL6rpj167r6H4CzS8C",
                "image" : {
                    "url" : "https://i.scdn.co/image/ab67616d00001e02a787f718fb485b66d6219247"
                }
            }
        }
    ];    

    const playlist = [
        {
            "id" : "5o6QR9AF8o9l4GwAbGbIUk",
            "owner" : "CyberRodeo"
        }
    ];

    DBOpenRequest.onerror = () => {
        console.log("Databse cannot be opened!");
    };

    DBOpenRequest.onsuccess = (event) => {
        db = DBOpenRequest.result;

        console.log("Database has been opened!");
        
        saveTracksToDB(song);
        // const transaction = db.transaction("savedSongs", "readwrite");
        // const objectStore = transaction.objectStore("savedSongs");

        // transaction.oncomplete = () => {
        //     console.log("Transaction completed!");
        // };

        // transaction.onerror = () =>{
        //     console.log("Transaction could not be completed!");
        // };

        // const request = objectStore.get("2fCklc5HvH4eeu2ilTEvvM");

        // request.onsuccess = () => {
        //     console.log(request.result);
        // };  

        // request.onerror = (event) => {
        //     console.log(event.error);
        // };
        // const request = objectStore.add(songs[0]);

        // request.oncomplete = () => {
        //     console.log("objectStore operation request fulfilled!");
        // };
    };

    DBOpenRequest.onupgradeneeded = (event) => {
        db = event.target.result;

        db.onerror = () => {
            console.log("Error loading database!");
        };

        const objectStore = db.createObjectStore(["savedSongs"], { keyPath: "id"});
        objectStore.createIndex("artist", "artist", { unique: false });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.transaction.oncomplete = () => {
            console.log("ObjectStore setting up completed!");
        };
    };

    const saveTrackToDB = async (track) => {
        const transaction = db.transaction(["savedSongs"], "readwrite");
        const objectStore = transaction.objectStore("savedSongs");

        transaction.oncomplete = () => {
            console.log("Transaction Complete!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be finished!");
        };

        const request = objectStore.add(track);

        request.onsuccess = () => {
            console.log("Request operation on objectStore fulfilled!");
        };

        request.onerror = () => {
            console.log("Request cannot be fulfilled.");
        };
    };

    const saveTracksToDB = async (track) => {
        const transaction = db.transaction(["savedSongs"], "readwrite");
        const objectStore = transaction.objectStore("savedSongs");

        transaction.oncomplete = () => {
            console.log("Transaction Complete!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be finished!");
        };

        for(i=0; i < track.length; i++){
            const request = objectStore.add(track[i]);

            request.onsuccess = () => {
                console.log("Request operation on objectStore fulfilled!");
            };
    
            request.onerror = () => {
                console.log("Request cannot be fulfilled.");
            };
        };
    };

    // const elem = document.getElementById("lewis");

    // elem.addEventListener("click", () => {
    //     checkIfPlaylistIsSaved("h1u2h3uk1h31u3h", "playlistMusicTracks");
    // });

    const checkIfPlaylistIsSaved = (playlist, btn) => {
        // console.log(tracks);
        const transaction = db.transaction(["savedPlaylists"], "readwrite");
        const objectStore = transaction.objectStore("savedPlaylists");

        transaction.oncomplete = () => {
            console.log("Transaction has been completed!")  
        };

        transaction.onerror = () => {
            console.log("Transaction could not be completed!");
        };

        const request = objectStore.get(playlist);
                                                                                    
        request.onsuccess = (event) => {
            // console.log(request.result);
            
            let data = [];

            if(request.result == undefined){
                // Do nothing;
            } else {
                data.push([request.result]);
            };
            
            if(data.length == 1){
                console.log("Yes! the playlist exists!");
                // btn.src = "/icons/playB.png";
            } else {
                console.log("No! the playlist does not exist!");
                // btn.src = "/icons/download.png";
            };
        };

        request.onerror = () => {
            console.log(request.error);
        };
    };

    const savePlaylistToDB = () => {
        const transaction = db.transaction(["savedPlaylists"], "readwrite");
        const objectStore = transaction.objectStore("savedPlaylists");

        transaction.oncomplete = () => {
            console.log("Transaction has been completed!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be completed.");
        };

        const request = objectStore.add(playlist);

        request.onsuccess = () => {
            console.log("Playlist has been successfully added to the database!");
        };

        request.onerror = () => {
            console.log(request.error);
        };
    };

    const addOpacClass = (elem) => {
        const target = document.getElementsByClassName(elem);
        // console.log(target);

        for(i=0; i < target.length; i++){
            target[i].classList.add("opac");
        };

        // console.log("This is it!");
    };

    const checkIfTrackIsSaved = async (track, targetElem) => {
        const transaction = db.transaction(["savedSongs"], "readwrite");
        const objectStore = transaction.objectStore("savedSongs");

        transaction.oncomplete = () => {
            console.log("Transaction has been completed!");
        };

        transaction.onerror = () => {
            console.log("Transaction could not be completed.");
        };

        const request = objectStore.get(track);

        request.onsuccess = (event) => {
            // console.log(request.result);
            
            let data = [];

            if(request.result == undefined){
                // Do nothing;
            } else {
                data.push([request.result]);
            };
            
            if(data.length == 1){
                console.log("Yes! the track exists! TFTF");
                const elem = document.getElementsByClassName(`${targetElem}`);
                elem[0].setAttribute("data-srcpath", data[0][0].audioSrcPath);
                elem[0].addEventListener("dblclick", () => {
                    let song = data[0][0];
                    let src = song.audioSrcPath;
                    audio.src = "/songs/test8.mp3";
                    // changeSiteTitle(song.name);
                    // changeSongMetaData(z+1);
                    changePlayPause('play');
                    displayDuration();
                    setSliderMax();
                    audio.play();
                });
            } else {
                console.log("No! the track does not exist!");
                addOpacClass(targetElem);
                const elem = document.getElementsByClassName(`${targetElem}`);
                elem[0].addEventListener("dblclick", (e) => {
                    let target = elem[0];
                    console.log(target);
                });
            }
        };

        request.onerror = () => {
            console.log(request.error);
        };
    };
// };