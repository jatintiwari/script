import fetch from 'node-fetch';
import 'dotenv/config';
import { execSync } from 'child_process';

import { writeFileSync, readFileSync } from 'fs';
import * as path from "path";

const LIMIT = 5;
const OFFSET = 0;
const getTracks = async () => {
    const response = await fetch(
        `https://api-v2.soundcloud.com/users/${process.env.USER_ID}/track_likes?client_id=${process.env.CLIENT_ID}&limit=${LIMIT}&offset=${OFFSET}&linked_partitioning=1&app_version=1653377235&app_locale=en`,
        {
            headers: {
                accept: 'application/json, text/javascript, */*; q=0.01',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                authorization: process.env.TOKEN,
                'cache-control': 'no-cache',
                pragma: 'no-cache',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                Referer: 'https://soundcloud.com/',
                'Referrer-Policy': 'origin',
            },
            body: null,
            method: 'GET',
        }
    );
    const jsonResponse = await response.json();
    return jsonResponse;
};

const downloadedSongs = new Set();

const downloadSongs = async (links) => {

    await links.forEach(async (link) => {
        if (downloadedSongs.has(link)) {
            return;
        }
        console.log(`[Downloading] ${link}`);
        downloadedSongs.add(link);
        await execSync(`cd /media/victor/Mosaic/SoundCloud && ~/Work/soundcloud-cli-master/sc-rpi dl "${link}"`);
    });
};

const safeGaurdNames = (name = "") => {
    return name.replace(/[^\w\s]/gi, '')
}

const checkIfSongsExists = (list) => {
    const trackName = list?.[0].track.title;
    const lastLikeTrackName = readFileSync(path.resolve("/home/victor/Work/crawlerscripts/lastTrack.txt")).toString();
    const fileExists = safeGaurdNames(lastLikeTrackName) === safeGaurdNames(trackName);
    console.log(`[log] Exists: ${fileExists} Last track name: ${lastLikeTrackName}, Current: ${trackName}`);

    return fileExists;
}

const addtLastLikeToFile = async (list) => {
    const trackName = list?.[0].track.title;
    await writeFileSync(path.resolve("/home/victor/Work/crawlerscripts/lastTrack.txt"), safeGaurdNames(trackName))
    console.log(`[log] Writing to file last like song name. Name ${trackName}`);
}

(async () => {
    const { collection } = await getTracks();
    const links = collection.map((track) => {
        return track.track.permalink_url;
    });
    const songsAlreadyDownloaded = checkIfSongsExists(collection);
    if (songsAlreadyDownloaded) {
        console.log('[Skipping] Latest tracks already downloaded.')
        return;
    }
    await downloadSongs(links);
    await addtLastLikeToFile(collection);
})();
