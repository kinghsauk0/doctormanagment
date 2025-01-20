"use client";
import React from 'react'
import Link from 'next/link';
import { Image } from 'primereact/image';
import "./footer.scss";
export default function Footer() {
  return (
    <footer className='footer bg-[#E1EEFF] pt-14 pb-6'>
      <div className='container px-4 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 md:gap-x-20 gap-y-10'>
          <div>
            <Link href="/" className='hdrlogo'>
                <Image src="/images/logo.webp" alt="Image" width="250" height='50' />
            </Link>
            <div className='my-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec risus feugiat lectus risus sed ullamcorper. Auctor semper fermentum</div>
            <div className=''>volutpat integer vel. In rhoncus elementum nunc, malesuada mi sed. Nibh est sit lobortis id semper.</div>
          </div>
          <div>
            <h3 className='mb-4'>Useful Links</h3>
            <ul className='ftrmnu flex flex-col gap-4 m-0 p-0'>
              <li>
                <Link href="">
                  <svg width="10" height="10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M121.373 457.373L322.745 256L121.373 54.627C115.432 48.6134 112.112 40.4935 112.138 32.0402C112.163 23.587 115.533 15.4873 121.51 9.50994C127.487 3.53258 135.587 0.163167 144.04 0.137507C152.493 0.111847 160.613 3.43202 166.627 9.37299L390.627 233.373C396.628 239.374 399.999 247.513 399.999 256C399.999 264.487 396.628 272.626 390.627 278.627L166.627 502.627C160.613 508.568 152.493 511.888 144.04 511.862C135.587 511.837 127.487 508.467 121.51 502.49C115.533 496.513 112.163 488.413 112.138 479.96C112.112 471.507 115.432 463.387 121.373 457.373Z" fill="black"/>
                  </svg>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="">
                  <svg width="10" height="10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M121.373 457.373L322.745 256L121.373 54.627C115.432 48.6134 112.112 40.4935 112.138 32.0402C112.163 23.587 115.533 15.4873 121.51 9.50994C127.487 3.53258 135.587 0.163167 144.04 0.137507C152.493 0.111847 160.613 3.43202 166.627 9.37299L390.627 233.373C396.628 239.374 399.999 247.513 399.999 256C399.999 264.487 396.628 272.626 390.627 278.627L166.627 502.627C160.613 508.568 152.493 511.888 144.04 511.862C135.587 511.837 127.487 508.467 121.51 502.49C115.533 496.513 112.163 488.413 112.138 479.96C112.112 471.507 115.432 463.387 121.373 457.373Z" fill="black"/>
                  </svg>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="">
                  <svg width="10" height="10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M121.373 457.373L322.745 256L121.373 54.627C115.432 48.6134 112.112 40.4935 112.138 32.0402C112.163 23.587 115.533 15.4873 121.51 9.50994C127.487 3.53258 135.587 0.163167 144.04 0.137507C152.493 0.111847 160.613 3.43202 166.627 9.37299L390.627 233.373C396.628 239.374 399.999 247.513 399.999 256C399.999 264.487 396.628 272.626 390.627 278.627L166.627 502.627C160.613 508.568 152.493 511.888 144.04 511.862C135.587 511.837 127.487 508.467 121.51 502.49C115.533 496.513 112.163 488.413 112.138 479.96C112.112 471.507 115.432 463.387 121.373 457.373Z" fill="black"/>
                  </svg>
                  <span>Our Mission</span>
                </Link>
              </li>
              <li>
                <Link href="">
                  <svg width="10" height="10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M121.373 457.373L322.745 256L121.373 54.627C115.432 48.6134 112.112 40.4935 112.138 32.0402C112.163 23.587 115.533 15.4873 121.51 9.50994C127.487 3.53258 135.587 0.163167 144.04 0.137507C152.493 0.111847 160.613 3.43202 166.627 9.37299L390.627 233.373C396.628 239.374 399.999 247.513 399.999 256C399.999 264.487 396.628 272.626 390.627 278.627L166.627 502.627C160.613 508.568 152.493 511.888 144.04 511.862C135.587 511.837 127.487 508.467 121.51 502.49C115.533 496.513 112.163 488.413 112.138 479.96C112.112 471.507 115.432 463.387 121.373 457.373Z" fill="black"/>
                  </svg>
                  <span>Our Team</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4'>Address</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.3523125584!2d88.26495139615301!3d22.535406374734368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1725536266045!5m2!1sen!2sin" width="100%" height="200" style={{border:'0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className='footerlinks text-sm flex flex-wrap gap-5 lg:gap-10 justify-center mt-10 pt-6 border-t border-b-0 border-l-0 border-r-0 border-solid border-[#b8b8b8]'>
          <span>© {new Date().getFullYear()} VCareHealth. All rights reserved.</span>
          <Link href="">Privacy Policy</Link>
          <Link href="">Notice of Privacy Practices</Link>
          <Link href="">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
