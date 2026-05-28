import React, { memo, useMemo, useState } from "react";

/**
 * =========================================================
 * OptimizedImage Component
 * ---------------------------------------------------------
 * Features:
 * - Cloudinary transformation injection
 * - Automatic WebP/AVIF delivery via f_auto
 * - Intelligent compression via q_auto
 * - Optional responsive sizing
 * - Lazy loading
 * - Async decoding
 * - Fallback image support
 * - Memoized for performance
 * - Graceful handling of non-Cloudinary URLs
 * =========================================================
 */

const DEFAULT_FALLBACK =
    "https://placehold.co/800x600?text=Image+Unavailable";

const OptimizedImage = ({
    src,
    alt = "image",
    width = 800,
    height = 600,
    crop = "fill",
    quality = "auto",
    format = "auto",
    className = "",
    loading = "lazy",
    fetchPriority = "auto",
    fallbackSrc = DEFAULT_FALLBACK,
    sizes = "100vw",
    draggable = false,
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(src);

    /**
     * ---------------------------------------------------------
     * Detect Cloudinary URL
     * ---------------------------------------------------------
     */
    const isCloudinary = useMemo(() => {
        return imgSrc?.includes("cloudinary.com");
    }, [imgSrc]);

    /**
     * ---------------------------------------------------------
     * Inject Cloudinary transformations dynamically
     * ---------------------------------------------------------
     */
    const optimizedSrc = useMemo(() => {
        if (!imgSrc) return fallbackSrc;

        // If not Cloudinary, return original source
        if (!isCloudinary) return imgSrc;

        try {
            const transformations = [
                `w_${width}`,
                `h_${height}`,
                `c_${crop}`,
                `q_${quality}`,
                `f_${format}`,
            ].join(",");

            /**
             * Replace:
             * /upload/
             * with:
             * /upload/transformation/
             */
            return imgSrc.replace(
                "/upload/",
                `/upload/${transformations}/`
            );
        } catch (error) {
            console.error("Cloudinary optimization failed:", error);
            return imgSrc;
        }
    }, [
        imgSrc,
        isCloudinary,
        width,
        height,
        crop,
        quality,
        format,
        fallbackSrc,
    ]);

    /**
     * ---------------------------------------------------------
     * Fallback Handling
     * ---------------------------------------------------------
     */
    const handleError = () => {
        if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    return (
        <img
            src={optimizedSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding="async"
            fetchPriority={fetchPriority}
            draggable={draggable}
            sizes={sizes}
            className={className}
            onError={handleError}
            {...props}
        />
    );
};

export default memo(OptimizedImage);