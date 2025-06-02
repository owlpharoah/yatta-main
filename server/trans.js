import TranscriptAPI from "youtube-transcript-api";

export async function rawTranscript(vid){
    let response = await TranscriptAPI.getTranscript(vid)
    return (JSON.stringify(response));
}

