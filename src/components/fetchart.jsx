import { getStorage, ref, getDownloadURL } from 'firebase/storage';


async function FetchArt(url, setter) {
    const storage = getStorage();
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Failed to fetch artworks');
            return;
        }
        const data = await response.json();
        const imgRefs = await Promise.all(
            data.map(async (artwork) => {
                if (artwork.image_url) {
                    const imageRef = ref(storage, artwork.image_url);
                    try {
                        const url = await getDownloadURL(imageRef);
                        return { ...artwork, image_url: url };
                    } catch (error) {
                        console.error('Error getting download URL for:', artwork.image_url, error);
                        return { ...artwork, image_url: null };
                    }
                } else {
                    return { ...artwork, image_url: null };
                }})
        );
        setter(imgRefs);
    } catch (error) {
        console.log('Failed to fetch artworks', error);
    }
}
export default FetchArt