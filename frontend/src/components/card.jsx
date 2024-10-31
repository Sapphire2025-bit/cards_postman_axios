import React, { useState } from "react";

//color options:
//we don't put any color in the 0 index because we want to check the bool of req.body.colorIndex
let colors = ["no_change", "#6aa84f", "#a4c2f4", "#8e7cc3", "#e69138"];

const Card = ({
    text,
    colorId,
    onDelete,
    onTextUpdate,
    onPickerSelect,
    showColorPicker,
    onColorSelect,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);

    const cardStyle = {
        margin: "20px",
        color: "white",
        fontSize: "24px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: colors[colorId],
        height: "80px",
        textAlign: "center",
        borderRadius: "10px",
    };
    //general style for the color picker and it's options,
    //the background color will be added to it
    const colorOptionStyle = {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "solid white 1px",
    };
    const trashStyle = {
        position: "absolute",
        bottom: "0",
        right: "10px",
        width: "30px",
        height: "30px",
        backgroundImage: `url(${require("./white_trash_can.png")})`,
        backgroundSize: "cover",
    };

    const colorPickerToggleStyle = {
        ...colorOptionStyle,
        position: "absolute",
        bottom: "0",
        left: "10px",
    };

    const colorPickerMenuStyle = {
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "space-evenly",
        padding: "5px",
        backgroundColor: "white",
        border: "solid gray 1px",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
    };

    //text update functions:
    const handleTextClick = () => {
        setIsEditing(true);
    };
    const handleTextChange = (e) => {
        setNewText(e.target.value);
    };
    const handleTextSubmit = () => {
        onTextUpdate(newText);
        setIsEditing(false);
    };

    //rendering options for text (show/ input):
    const renderTextOptions = () => {
        if (isEditing) {
            return (
                <input
                    type="text"
                    value={newText}
                    onChange={handleTextChange}
                    onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                />
            );
        } else {
            return <div onClick={handleTextClick}>{newText}</div>;
        }
    };
    //rendering options for buttons (color, trash):
    const renderButtonsOptions = () => {
        if (showColorPicker) {
            {
                /* color picker conditional menu */
            }
            return (
                <div style={colorPickerMenuStyle}>
                    {/* map all the different color buttons: */}
                    {colors.slice(1).map((color, index) => (
                        <button
                            key={index}
                            onClick={() => onColorSelect(index + 1)}
                            style={{ ...colorOptionStyle, backgroundColor: color }}
                        />
                    ))}
                </div>
            );
        } else {
            {
                /* conditional color picker toggle and delete option menu */
            }
            return (
                <div>
                    <button
                        style={{
                            ...colorPickerToggleStyle,
                            backgroundColor: colors[colorId],
                        }}
                        onClick={() => onPickerSelect(colorId)}
                    />
                    <div style={trashStyle} onClick={onDelete}></div>
                </div>
            );
        }
    };

    return (
        <div className="card" style={cardStyle}>
            {renderTextOptions()}
            <br />
            {renderButtonsOptions()}
        </div>
    );
};

export default Card;
