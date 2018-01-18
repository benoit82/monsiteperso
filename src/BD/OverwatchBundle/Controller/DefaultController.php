<?php

namespace BD\OverwatchBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('BDOverwatchBundle:Default:index.html.twig');
    }
}
