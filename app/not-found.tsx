export default function NotFound() {
    return (
      <>
        <div className={`page pt-100`}>
          <section className="w-full bg-white text-slate">
            <div className="px-50 md:px-150 py-50">
              <div className="w-full">
                <div className="w-full">
                  <div className={`text-70 leading-none text-center`}>Not Found</div>
                  <div className={`text-30 leading-none text-center`}> Could not find requested resource</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }