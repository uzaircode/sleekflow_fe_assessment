'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, Spinner } from '@heroui/react';

interface RetryableAvatarProps {
  src: string;
  name: string;
  maxRetries?: number;
  retryDelay?: number;
  classNames?: {
    name?: string;
    wrapper?: string;
  };
}

export default function RetryableAvatar({
  src,
  name,
  maxRetries = 3,
  retryDelay = 6000, // 6 seconds delay
  classNames,
}: RetryableAvatarProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setRetryCount(0);
    setIsRetrying(false);
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    if (retryCount < maxRetries) {
      setIsRetrying(true);

      const delay = retryDelay * Math.pow(1.5, retryCount);

      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setImageSrc(`${src}?retry=${Date.now()}`);
        setIsRetrying(false);
      }, delay);
    } else {
      setHasError(true);
      setIsRetrying(false);
    }
  };

  if (isRetrying) {
    return (
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-default-100">
          <Spinner size="sm" color="primary" />
        </div>
        <div className={classNames?.wrapper}>
          <span className={classNames?.name}>{name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={hasError ? undefined : imageSrc}
        name={name}
        showFallback
        onError={handleImageError}
        className="flex-shrink-0"
      />
      <div className={classNames?.wrapper}>
        <span className={classNames?.name}>{name}</span>
      </div>
    </div>
  );
}
