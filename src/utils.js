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
    const filteredPackages = purchasedPackages.filter((p) => p.availableClasses > 0);
    let earliestPackage = filteredPackages[0];
    purchasedPackages.forEach((p) => {
        if (p.expireDate < earliestPackage.expireDate && p.availableClasses > 0) {
            earliestPackage = p;
        }
    });
    return earliestPackage;
}