import { Component, useEffect, useRef } from "react";
import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';

class CustomPainter extends Component {
    clearCanvas(canvas: Canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }

    drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, fillStyle?: CanvasRenderingContext2D["fillStyle"] | undefined, strokeStyle?: CanvasRenderingContext2D["strokeStyle"] | undefined, strokeWidth?: number | undefined) {
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

    handleCanvas(canvas: Canvas) {
        if (canvas) {
            const canvasContext = canvas.getContext('2d');
            const width = canvas.width
            const height = canvas.height

            canvasContext.fillStyle = 'green'
            canvasContext.fillRect(10, 20, 50, 80)
            this.drawCircle(canvasContext, width / 2, height / 2, width / 2, 'red')
        }
    }

    render() {
        return <Canvas ref={this.handleCanvas} style={{ width: "100%", height: "100%" }} />
    }
};

export default CustomPainter;