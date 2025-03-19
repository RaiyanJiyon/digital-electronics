import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const TopButton = () => {
    return (
        <div>
            {/* Back to top button */}
            <Link
                href="#"
                className="fixed bottom-6 right-6 bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition-colors"
                aria-label="Back to top"
            >
                <ArrowUp className="h-5 w-5" />
            </Link>
        </div>
    );
};

export default TopButton;