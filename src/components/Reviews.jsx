import { React, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useTranslation } from '../hooks/useTranslation';
import './Reviews.css'
export default function Reviews() {
    const { t } = useTranslation();
    const reviews = t('reviews.items');

    const [currentReview, setCurrentReview] = useState(0);

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    };
    return (
        <>
            <section className="ReviewsSection">
                <div className="reviews-header">
                    <h2>{t('reviews.title')}</h2>
                    <div className="reviews-controls">
                        <button onClick={prevReview}><MdArrowBack /></button>
                        <button onClick={nextReview}><MdArrowForward /></button>
                    </div>

                </div>

                <div className="reviews-container">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className={`review-card ${index === currentReview ? "active" : ""}`}
                        >
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <p className="review-text">{review.text}</p>
                            <h4 className="review-name">{review.name}</h4>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}