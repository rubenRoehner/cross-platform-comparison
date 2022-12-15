import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";

const { width, height } = Dimensions.get('window');

const CustomPainter: React.FC = () => {
    const [canvasReference, setCanvas] = useState<Canvas | null>(null)
    const [canvasWidth, setCanvasWidth] = useState(0)
    var [canvasHeight, setCanvasHeight] = useState(0)

    var progress = 10

    function clearCanvas(canvas: Canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }

    function toRadians(angle: number): number {
        return angle * Math.PI / 180
    }

    function animatePrgoressIndicator() {
        if (canvasReference) {
            const context = canvasReference.getContext('2d');
            if (context) {
                clearCanvas(canvasReference)

                const width = canvasReference.width
                const height = canvasReference.height

                context.fillStyle = "#f1f1f1"
                context.fillRect(0, 0, width, height)

                drawAnimatedCircle(context, progress, width / 2, height / 2, 100, "blue")
                context.textAlign = "center"
                context.fillText("Loading...", width / 2, height / 2 + 120)

                progress += 0.05
                if (progress >= 100) {
                    progress = 0
                }
            }
        }
    }

    function drawAnimatedCircle(context: CanvasRenderingContext2D, animationProgress: number, x: number, y: number, radius: number, fillStyle?: CanvasRenderingContext2D["fillStyle"] | undefined, strokeStyle?: CanvasRenderingContext2D["strokeStyle"] | undefined, strokeWidth?: number | undefined) {
        context.beginPath()
        context.arc(x, y, radius, toRadians(90 - animationProgress * 1.8), toRadians(90 + animationProgress * 1.8), false)
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

    function startAnimation() {
        animatePrgoressIndicator()
        requestAnimationFrame(startAnimation)
    }

    useEffect(() => {
        setCanvasWidth(width)
        setCanvasHeight(height)
        if (canvasReference) {
            canvasReference.width = width
            canvasReference.height = height
        }
    }, [])

    useLayoutEffect(() => {
        if (canvasReference) {
            canvasReference.width = width
            canvasReference.height = height
        }
        animatePrgoressIndicator()
        startAnimation()
    }, [canvasReference])

    return <View style={{ width: "100%", height: "100%" }}><Canvas style={{ width: canvasWidth, height: canvasHeight }} ref={(canvas: Canvas) => (setCanvas(canvas))} /></View>
};

export default CustomPainter;
/* mport React, { Component, useEffect, useRef } from "react";
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
} */