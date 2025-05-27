import { useEffect, useState } from "react";
import { getNewsDetails } from "../api";
import { useParams } from "react-router-dom";
import { useNavigation } from "../shared/hooks/useNavigation";

export function NewsPage() {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const params = useParams();
    const { id } = params;
    const navigate = useNavigation();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNewsDetails(id);
                setNews(response);
                setLoading(false)
            }catch (error) {
                console.error("Error fetching news:", error);
            }
        }

        fetchNews();
    }, [])
    

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="news-page">
            <div className="news-page__head">
                <button type='button' onClick={navigate.back}>Back to news list</button>
                <h1 className="news-page__title" style={{fontSize: '32px', fontWeight: '700'}}>{news.title}</h1>
            </div>
            <img src={news.imgUrl} className="news-page__title" alt="Image" />
            <p className="news-page__text">{news.description}</p>
        </div>
    );
}