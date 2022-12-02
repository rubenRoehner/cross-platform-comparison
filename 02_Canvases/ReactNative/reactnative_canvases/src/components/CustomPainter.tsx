import React, { Component, useEffect, useRef } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas"

const { width, height } = Dimensions.get('window');

export default class CustomPainter extends Component {
    canvas: Canvas | null = null;

    componentDidMount(): void {
        if (this.canvas) {
            this.canvas.width = width
            this.canvas.height = height
            this.componentDidUpdate()
        }
    }

    componentDidUpdate() {
        if (this.canvas) {
            const canvasContext = this.canvas.getContext('2d');
            const canvasWidth = this.canvas.width
            const canvasHeight = this.canvas.height
            clearCanvas(this.canvas)

            canvasContext.fillStyle = 'green'
            canvasContext.fillRect(10, 20, 50, 80)

            drawCircle(canvasContext, canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, 'red')
        }
    }

    render() {
        return (
            <View style={{ width: "100%", height: "100%" }}>
                <Canvas ref={(canvas: Canvas) => (this.canvas = canvas)} />
            </View>
        );
    }
};


function clearCanvas(canvas: Canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, fillStyle?: CanvasRenderingContext2D["fillStyle"] | undefined, strokeStyle?: CanvasRenderingContext2D["strokeStyle"] | undefined, strokeWidth?: number | undefined) {
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fillStyle) {
        context.fillStyle = fillStyle
        context.fill()
    }
    if (strokeStyle) {
        context.strokeStyle = strokeStyle
        if (strokeWidth) {
            context.lineWidth = strokeWidth
        }
        context.stroke()
    }
}