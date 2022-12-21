import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, StatusBar, View } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";

const { width, height } = Dimensions.get('window');

const CustomPainter: React.FC = () => {
    const [canvasReference, setCanvas] = useState<Canvas | null>(null)
    const [canvasWidth, setCanvasWidth] = useState(0)
    var [canvasHeight, setCanvasHeight] = useState(0)
    const previousTimeRef = useRef<number>()
    const animationRef = useRef<number>()

    var progress = 10

    function clearCanvas(canvas: Canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }

    function toRadians(angle: number): number {
        return angle * Math.PI / 180
    }

    function animateProgressIndicator(time: number) {
        if (canvasReference) {
            const context = canvasReference.getContext('2d');
            if (context) {
                let deltaTime = 0
                if (previousTimeRef.current != undefined) {
                    deltaTime = time - previousTimeRef.current;
                }
                clearCanvas(canvasReference)

                const width = canvasReference.width
                const height = canvasReference.height

                context.fillStyle = "#f1f1f1"
                context.fillRect(0, 0, width, height)

                drawAnimatedCircle(context, progress, width / 2, height / 2 - 50, 100, "blue")

                context.textAlign = "center"
                context.font = "normal normal bold 20px sans-serif"
                context.fillText("Loading...", width / 2, height / 2 + 90)

                progress += (time / 50000000)
                if (progress >= 100) {
                    progress = 0
                }
                previousTimeRef.current = time;
                animationRef.current = requestAnimationFrame(animateProgressIndicator)
            }
        }
    }

    function drawAnimatedCircle(context: CanvasRenderingContext2D, animationProgress: number, x: number, y: number, radius: number, fillStyle?: CanvasRenderingContext2D["fillStyle"] | undefined) {
        context.beginPath()
        context.arc(x, y, radius, toRadians(90 - animationProgress * 1.8), toRadians(90 + animationProgress * 1.8), false)
        if (fillStyle) {
            context.fillStyle = fillStyle
            context.fill()
        }
    }

    useEffect(() => {
        setCanvasWidth(width)
        let statusbarHeight = StatusBar.currentHeight ?? 0
        let appBarHeight = 20
        setCanvasHeight(height - statusbarHeight)
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
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
        animateProgressIndicator(0)
        animationRef.current = requestAnimationFrame(animateProgressIndicator)
    }, [canvasReference])

    return <View style={{ width: "100%", height: "100%" }}><Canvas style={{ width: canvasWidth, height: canvasHeight }} ref={(canvas: Canvas) => (setCanvas(canvas))} /></View>
};

export default CustomPainter;