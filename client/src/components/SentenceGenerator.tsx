import {useEffect, useState} from "react";


const sentences = [
    "Visualize the power of the OpenAI API instantly with our intuitive playground.",
    "See the potential of your API keys come to life through interactive demonstrations.",
    "Experience real-time results and insights with our user-friendly playground interface.",
    "Easily experiment and prototype with your API keys in a sandbox environment.",
    "Effortlessly understand and test the capabilities of the OpenAI API with our playground tools.",
    "Gain valuable insights and understanding by visually exploring the output of your API calls.",
    "Streamline your development process by quickly iterating and testing with our API playground.",
    "Empower your creativity and innovation by visually interpreting the output of your API requests."
]

export const SentenceGenerator: React.FC = () => {

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [displayedCharacters, setDisplayedCharacters] = useState('');

    useEffect(() => {

        let charIndex = 0;
        let timeout: NodeJS.Timeout;

        const writeNextCharacter = () => {
            if (charIndex < sentences[currentSentenceIndex].length) {
                setDisplayedCharacters((prevChars) => prevChars + sentences[currentSentenceIndex].charAt(charIndex))
                charIndex++;
                timeout = setTimeout(writeNextCharacter, 70);
            } else {
                setTimeout(() => {
                    setCurrentSentenceIndex((prevIndex)=> {
                        let newIndex = (prevIndex + 1) % sentences.length;
                        setDisplayedCharacters(sentences[newIndex].charAt(0))
                        charIndex = 0
                        return newIndex
                    })
                }, 2000)
            }
        }
        writeNextCharacter()

        return () => clearInterval(timeout)
    }, [currentSentenceIndex])
    return (
        <p className= 'text-custom-color text-3xl font-bold'>
            {displayedCharacters}
        </p>
    )
}