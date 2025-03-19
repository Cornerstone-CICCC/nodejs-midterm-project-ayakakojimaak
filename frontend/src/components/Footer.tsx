const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-700 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>
          Data provided by:{" "}
          <a
            href="https://www.thecocktaildb.com/"
            className="underline hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer">
            TheCocktailDB
          </a>
        </p>
        <p className="mt-2">© 2023 BITTERS Liquor Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
