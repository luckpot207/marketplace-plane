import React from "react";

import type { Props } from "./types";

export const SettingIcon: React.FC<Props> = ({
  width = "24",
  height = "24",
  color = "#858E96",
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color}
      d="M12.9062 1.375C13.0518 1.375 13.1936 1.42121 13.3112 1.50695C13.4288 1.59269 13.5162 1.71355 13.5607 1.85212L14.317 4.202C14.6346 4.35737 14.9385 4.532 15.2286 4.72862L17.6431 4.20888C17.7854 4.17848 17.9338 4.19406 18.0667 4.25336C18.1997 4.31267 18.3103 4.41264 18.3828 4.53888L20.2886 7.8375C20.3614 7.96366 20.3922 8.10968 20.3766 8.2545C20.361 8.39931 20.2999 8.53544 20.202 8.64325L18.5451 10.472C18.5692 10.8227 18.5692 11.1746 18.5451 11.5252L20.202 13.3567C20.2999 13.4646 20.361 13.6007 20.3766 13.7455C20.3922 13.8903 20.3614 14.0363 20.2886 14.1625L18.3828 17.4625C18.3101 17.5885 18.1994 17.6882 18.0664 17.7472C17.9335 17.8063 17.7853 17.8216 17.6431 17.7911L15.2286 17.2714C14.9398 17.4666 14.6346 17.6426 14.3183 17.798L13.5607 20.1479C13.5162 20.2864 13.4288 20.4073 13.3112 20.4931C13.1936 20.5788 13.0518 20.625 12.9062 20.625H9.0947C8.94915 20.625 8.80735 20.5788 8.68973 20.4931C8.57211 20.4073 8.48474 20.2864 8.4402 20.1479L7.68533 17.7994C7.36856 17.6445 7.06302 17.4676 6.77095 17.27L4.35783 17.7911C4.21547 17.8215 4.06713 17.8059 3.93419 17.7466C3.80125 17.6873 3.69057 17.5874 3.61808 17.4611L1.71233 14.1625C1.63956 14.0363 1.60873 13.8903 1.6243 13.7455C1.63987 13.6007 1.70103 13.4646 1.79895 13.3567L3.45583 11.5252C3.43183 11.1755 3.43183 10.8245 3.45583 10.4748L1.79895 8.64325C1.70103 8.53544 1.63987 8.39931 1.6243 8.2545C1.60873 8.10968 1.63956 7.96366 1.71233 7.8375L3.61808 4.5375C3.69077 4.41151 3.80154 4.31183 3.93446 4.25278C4.06739 4.19373 4.21562 4.17836 4.35783 4.20888L6.77095 4.73C7.06245 4.53338 7.3677 4.356 7.68533 4.20063L8.44158 1.85212C8.48597 1.714 8.57293 1.59346 8.69 1.50776C8.80706 1.42205 8.94824 1.37559 9.09333 1.375H12.9048H12.9062ZM12.403 2.75H9.59795L8.81695 5.17963L8.29033 5.43675C8.03144 5.56344 7.78152 5.70769 7.54233 5.8685L7.05558 6.1985L4.55858 5.6595L3.15608 8.0905L4.86795 9.98525L4.8267 10.5682C4.80695 10.8557 4.80695 11.1443 4.8267 11.4318L4.86795 12.0147L3.15333 13.9095L4.5572 16.3405L7.0542 15.8029L7.54095 16.1315C7.78015 16.2923 8.03007 16.4366 8.28895 16.5632L8.81558 16.8204L9.59795 19.25H12.4057L13.1895 16.819L13.7147 16.5632C13.9733 16.4369 14.2228 16.2926 14.4613 16.1315L14.9467 15.8029L17.4451 16.3405L18.8476 13.9095L17.1343 12.0147L17.1756 11.4318C17.1954 11.1438 17.1954 10.8548 17.1756 10.5669L17.1343 9.98388L18.849 8.0905L17.4451 5.6595L14.9467 6.19575L14.4613 5.8685C14.2228 5.70737 13.9733 5.5631 13.7147 5.43675L13.1895 5.181L12.4043 2.75H12.403ZM11.0005 6.875C12.0945 6.875 13.1437 7.3096 13.9173 8.08318C14.6909 8.85677 15.1255 9.90598 15.1255 11C15.1255 12.094 14.6909 13.1432 13.9173 13.9168C13.1437 14.6904 12.0945 15.125 11.0005 15.125C9.90644 15.125 8.85723 14.6904 8.08364 13.9168C7.31005 13.1432 6.87545 12.094 6.87545 11C6.87545 9.90598 7.31005 8.85677 8.08364 8.08318C8.85723 7.3096 9.90644 6.875 11.0005 6.875ZM11.0005 8.25C10.2711 8.25 9.57164 8.53973 9.05591 9.05546C8.54018 9.57118 8.25045 10.2707 8.25045 11C8.25045 11.7293 8.54018 12.4288 9.05591 12.9445C9.57164 13.4603 10.2711 13.75 11.0005 13.75C11.7298 13.75 12.4293 13.4603 12.945 12.9445C13.4607 12.4288 13.7505 11.7293 13.7505 11C13.7505 10.2707 13.4607 9.57118 12.945 9.05546C12.4293 8.53973 11.7298 8.25 11.0005 8.25Z"
    />
  </svg>
);
