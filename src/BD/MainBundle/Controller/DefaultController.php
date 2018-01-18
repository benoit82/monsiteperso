<?php

namespace BD\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('BDMainBundle:Default:index.html.twig');
    }
}
