type ImageContainerProps = {
    className?: string;
    src?: string;
    alt?: string;
}

const ImageContainer = ({className="", src, alt=""}: ImageContainerProps) => {
  return (
    <img className={`object-cover w-full h-full ${className}`} src={src} alt={alt} />
  )
}

export default ImageContainer;