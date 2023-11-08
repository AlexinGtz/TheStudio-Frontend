import { msInADay } from './constants';

export const calculateUserClasses = (purchasedPackages) => {
    let availableClasses = 0;
    purchasedPackages.forEach((p) => {
        availableClasses += p.availableClasses;
    });
    return availableClasses;
}

export const daysForPackageToExpire = (packageToCalculate) => {
    const today = new Date();
    const earliestPackage = packageToCalculate;
    const earliestPackageDate = new Date(earliestPackage.expireDate);
    const differenceInTime = earliestPackageDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / msInADay;
    return Math.round(differenceInDays);
}

export const selectEarliestPackage = (purchasedPackages) => {
    let earliestPackage = purchasedPackages[0];
    purchasedPackages.forEach((p) => {
        if (p.expireDate < earliestPackage.expireDate) {
            earliestPackage = p;
        }
    });
    return earliestPackage;
}