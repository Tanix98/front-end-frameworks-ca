// Pass in the year prop with the number value from the currentYear variable

function GetCurrentYear(props) {
    return <p>Copyright © {props.year}</p>;
}

function CopyrightYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <div>
            <GetCurrentYear year={currentYear} />
        </div>
    );
}

export default CopyrightYear;
