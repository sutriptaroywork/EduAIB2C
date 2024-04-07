import celebrationLoaderImg from "../../public/Confitee .json"
import { useLottie } from "lottie-react";

const CelebrationLoader = ({ style }) => {

  // give style props to use this loader
  const options = {
    animationData: celebrationLoaderImg,
    loop: false,
  };

  const { View } = useLottie(options, style);
  return (
    View
  )
}

export default CelebrationLoader