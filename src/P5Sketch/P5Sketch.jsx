import React, { useEffect, useLayoutEffect, useState } from "react";
import Sketch from "react-p5";
import deviceType from "../utils/mobileDetection";
import P5Cursor from "./P5Cursor";
import BackgroundNoise from "./BackgroundNoise";
import LandingText from "./LandingText";
import { log } from "three/examples/jsm/nodes/Nodes.js";




let x = 50;
let y = 50;
let timer = 0;
let max_distance = 50;
let colorGradientUp = false;

let textColors = {
    white: "#ffffff",
    pink: "#f0f",
    tankMidBlue: "#04157E",
    tankDarkBlue: "#1c1827"
}

let otherColors = {
    bkgrdPurple: "#1c1827",
    bkgrdGray: "#ff33ff"
    // bkgrdGray: "#333333"
}

let nameDimens = {
    left: 200,
    top: 200,
    width: 1000,
    height: 200
}

let titleDimens = {
    left: 200,
    top: 450,
    width: 1000,
    height: 200
}

export default function P5Sketch({ props }) {


    const [dimen, setDimens] = useState();
    const [devType, setDevType] = useState();
    const [p5, setP5] = useState();

    let orbCursor, landingName, landingTitle, font, fontSize, backgroundNoise;
    let img;
    let input;
    let plantXPos, plantYPos, plantH, plantW;
    let currDotColorHSV = 180;
    let hsvGoingUp = true;

    let landingTextInstances = [];


    useEffect(() => {
        setDimens(props);
        let device = deviceType();
        setDevType(device);
        window.addEventListener('resize', windowResized);
        return () =>
            // console.log("fun time");
            window.removeEventListener('resize', windowResized)
    }, []);

    useLayoutEffect(() => {
        setDimens(props);
        let device = deviceType();
        setDevType(device);
        window.addEventListener('resize', windowResized);
    }, []);

    function windowResized() {
        console.log("wundow windowResized");
    }


    function initTextElements(p5) {
        landingName = new LandingText(p5, p5.displayWidth, "Erik Kimsey", font, textColors.white, nameDimens);
        landingTextInstances.push(landingName);

        landingTitle = new LandingText(p5, p5.displayWidth, "Software Developer", font, textColors.white, titleDimens);
        landingTextInstances.push(landingTitle);
    }

    function preload(p5) {
        font = p5.loadFont('./Dopestyle.ttf');
        img = p5.loadImage("https://i.imgur.com/7oRFsCR.png");
        fontSize = 40;
    }

    function setup(p5, canvasParentRef) {
        // p5.noStroke();

        setP5(p5);


        p5.createCanvas(p5.displayWidth, p5.displayHeight).parent(canvasParentRef);
        initTextElements(p5);
        p5.colorMode(p5.HSL);
        p5.angleMode(p5.DEGREES);
        p5.frameRate(15);
        orbCursor = new P5Cursor(p5, 22);
        backgroundNoise = new BackgroundNoise(p5, 0.0, 0.0, p5.displayWidth, p5.displayHeight, otherColors.bkgrdPurple, otherColors.bkgrdGray);
        max_distance = p5.dist(0, 0, p5.displayWidth, p5.displayHeight);
    };

    // function windowResized(p5) {
    //   if (p5) {
    //     p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    //     initTextElements(p5);
    //   }
    // }

    function keyPressed(p5) {
        p5.noStroke();
    }

    let r1 = 219;
    let r2 = 255;
    let b1 = 219;
    let b2 = 114;
    let r = 100, g = 77, b = 110;

    function lineColor(p5) {

        if (r === 111) {
            colorGradientUp = false
        }

        if (r === 99) {
            colorGradientUp = true
        }

        if (colorGradientUp) {
            r++;
            b--;
            g++;
        } else {
            r--;
            b++;
            g--;
        }


        return `rgba(${r}, ${g}, ${r}, 0.2)`;
    }

    function draw(p5) {
        p5.background("rgb(1,0,1)");

        // if (devType !== "desktop") {

        // } else {
        //   if (orbCursor !== undefined) {
        //     orbCursor.updateCursor();
        //   }
        // }
        // while (timer < 1000) {

        for (let i = max_distance; i <= p5.displayWidth - max_distance; i += max_distance) {
            for (let j = 0; j <= p5.displayHeight - max_distance; j += max_distance) {

                // "radius" from mouse
                let dist = p5.dist(p5.mouseX, p5.mouseY, i, j);
                // console.log(dist);


                let distScale = p5.map(dist, 1, 3000, 8, 22);

                distScale = p5.sin(distScale) * 10;
                if (dist < max_distance * 29) {

                    // 𝑥=𝑟cos𝜃, 𝑦=𝑟sin𝜃.
                    let xAngle =
                        //  

                        p5.point(i, j);
                    p5.strokeWeight(distScale);
                    p5.stroke(currDotColorHSV, 100, 50);

                    if (currDotColorHSV >= 320) {
                        hsvGoingUp = false;
                    }

                    if (currDotColorHSV <= 160) {
                        hsvGoingUp = true;
                    }

                    if (currDotColorHSV < 320 && hsvGoingUp) {
                        currDotColorHSV += 0.005;
                    }
                    if (currDotColorHSV > 160 && !hsvGoingUp) {
                        currDotColorHSV -= 0.005;
                    }
                    //
                }

                /**
                 * WIP:
                 * ** animated, wavy ellipse... using bezierVertices
                 */
                // p5.noFill();
                // p5.stroke(255);
                // p5.beginShape();
                // p5.vertex(p5.mouseX + 100, p5.mouseY + 100); // first point
                // p5.bezierVertex(p5.mouseX + 100, p5.mouseY, p5.mouseX + 100, p5.mouseY + 10, p5.mouseX - 100, p5.mouseY - 100);
                // // p5.bezierVertex(p5.mouseX - 100, p5.mouseY - 30, p5.mouseX - 50, p5.mouseY - 100, p5.mouseX - 70, p5.mouseY - 70); // if first 2 numbers are p5.changed to 20, 130 it becomes continuous
                // p5.endShape();
            }
        }
        // p5.frameRate(22)
        // }
        // if (backgroundNoise) {
        //   backgroundNoise.drawNoise();
        // }
    }


    return (
        <>
            <Sketch preload={preload} setup={setup} draw={draw} keyPressed={keyPressed} style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }} />
        </>)
}