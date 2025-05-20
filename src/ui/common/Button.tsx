// import { TbArrowBigRight, TbArrowBigLeft, TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { IoIosArrowForward , IoIosArrowBack , IoIosArrowUp , IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
    arrowDirection?: 'right' | 'left' | 'up' | 'down';
    className?: string;
    iconClassName?: string;
    navigateTo?: string;  // New prop for navigation
    onClick?: () => void; // Existing click handler
};

const Button = ({ 
    arrowDirection = 'right', 
    className = '', 
    iconClassName = '' ,
    navigateTo,
    onClick, 
}: ButtonProps) => {
    const navigate = useNavigate();
    const ArrowIcon = {
        right: IoIosArrowForward,
        left: IoIosArrowBack,
        up: IoIosArrowUp,
        down: IoIosArrowDown,
    }[arrowDirection];

    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
        onClick?.();
    };

    return (
        <button 
            onClick={handleClick}
            className={`bg-[#6425FE] p-2 rounded-xl hover:bg-[#6425FE]/90 transition-colors ${className}`}
        >
            <ArrowIcon className={`w-6 h-6 text-white ${iconClassName}`} />
        </button>
    );
};

export default Button;