import { useParams } from "react-router";

const Welcome = () => {
    console.log(useParams())
    const { username } = useParams();

    return (
        <div>
            welcome {username}!
        </div>
    );
};

export default Welcome;