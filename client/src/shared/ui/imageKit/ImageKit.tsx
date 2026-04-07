import { Image, type IKImageProps } from "@imagekit/next";
import { imageKitUrl } from "@shared/config";




export const ImageKit = ({...rest}: IKImageProps) => {

    return (
        <Image
            urlEndpoint={imageKitUrl}
            {...rest}
        />
    )
}