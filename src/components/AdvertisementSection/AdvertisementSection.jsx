export default function AdvertisementSection() {
    return (
        <section className="advertisement-section">
            <h2>For Better Experience Download <br /> Tomato App</h2>
            <section>
                <Icon />
                <Icon />
            </section>
        </section>
    );
}

function Icon() {
    return (
        <div className="icon-container">
            {/* <img src="" alt="" /> */}
            <div style={{ width: "3rem", aspectRatio: 1, backgroundColor: "Blue" }}></div>
            <div>
                <p>sdfsdf</p>
                <h3>dfgjnsdknkl</h3>
            </div>
        </div>
    )
}