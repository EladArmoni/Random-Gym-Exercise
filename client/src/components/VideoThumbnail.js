import React from 'react';

function VideoThumbnail({ exercise }) {
    const getYouTubeVideoId = (url) => {
        const videoIdMatch = url && url.match(/embed\/([a-zA-Z0-9_-]+)/);
        return videoIdMatch && videoIdMatch[1];
    };

    const videoId = getYouTubeVideoId(exercise.description);

    return (
        <div>
            {videoId && (
                <img
                    src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                    alt="Video Thumbnail"
                    className="card-img-top"
                />
            )}
        </div>
    );
}

export default VideoThumbnail;
