const ArchiveSection = () => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-red-500 text-white text-sm font-bold py-3 px-4">
        CATEGORIES
      </div>
      <div className="p-4">
        <ul className="pl-8">
          <li className="text-sm hover:text-red-500 font-medium list-disc">
            June 2019
          </li>
          <li className="text-sm hover:text-red-500 font-medium list-disc">
            May 2019
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArchiveSection;
