import { IonPopover, IonDatetime } from "@ionic/react";

const DatePickerPopover = (props: { isOpen: boolean, setIsOpen(value: boolean): void }) => {

    return (
        <>
            <IonPopover isOpen={props.isOpen} onDidDismiss={() => props.setIsOpen(false)}>
                <IonDatetime presentation="date" />
            </IonPopover>
        </>
    );
}