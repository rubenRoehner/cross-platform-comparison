import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CustomPainter: React.FC = () => {
    const canvasReference = useRef<HTMLCanvasElement>(null);
    const [canvasWidth, setCanvasWidth] = useState(0)
    var [canvasHeight, setCanvasHeight] = useState(0)

    var progress = 10

    function clearCanvas(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }

    function toRadians(angle: number): number {
        return angle * Math.PI / 180
    }

    function animatePrgoressIndicator() {
        if (canvasReference.current) {
            const context = canvasReference.current.getContext('2d');
            if (context) {
                clearCanvas(context)

                const width = context.canvas.width
                const height = context.canvas.height

                console.log("tick" + width)

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

    function drawAnimatedCircle(context: CanvasRenderingContext2D, animationProgress: number, x: number, y: number, radius: number, fillStyle?: CanvasFillStrokeStyles["fillStyle"] | undefined, strokeStyle?: CanvasFillStrokeStyles["strokeStyle"] | undefined, strokeWidth?: number | undefined) {
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
        var canvas = canvasReference.current
        if (canvas) {
            setCanvasWidth(canvas.offsetWidth)
            setCanvasHeight(canvas.offsetHeight)
        }

    }, [])

    useLayoutEffect(() => {
        animatePrgoressIndicator()
        startAnimation()
    }, [])

    return <view style={{ width: "100%", height: "100%" }}><canvas style={{ width: canvasWidth, height: canvasHeight }} width={canvasWidth} height={canvasHeight} ref={canvasReference} /></view>
};

export default CustomPainter;
