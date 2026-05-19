import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from "../components/menus/CartComponent";

const BasicLayout = ({ children }) => {
  const safeChildren = children ?? null;

  return (
    <>
      <BasicMenu />

      <div className="flex flex-col my-5 space-y-1 w-full bg-white md:flex-row md:space-x-1 md:space-y-0">
        <main className="px-5 py-5 min-h-screen bg-sky-300 md:w-4/5 lg:w-3/4">
          {safeChildren}
        </main>

        <aside className="px-5 py-5 bg-green-300 md:w-1/5 lg:w-1/4">
          <div className="sticky top-5">
            <CartComponent />
          </div>
        </aside>
      </div>
    </>
  );
};

export default BasicLayout;
