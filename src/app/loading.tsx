import Image from "next/image";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Image
                src={"/assets/loader-1.gif"}
                alt="loading gif"
                width={50} // Adjust size as needed
                height={50}
            />
        </div>
    );
};

export default Loading;