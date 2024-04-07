import infinityLoder  from "../../public/loaders/xZ9cFJZF59.json"
import { useLottie }from "lottie-react";


const InfinityLoader = ({style})=>{

    // give style props to use this loader
    
  const options = {
    animationData: infinityLoder,
    loop: true
  };

  const { View } = useLottie(options,style);
    return(
        View
    )
}

export default InfinityLoader